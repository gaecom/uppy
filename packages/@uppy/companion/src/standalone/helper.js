const fs = require('fs')
const merge = require('lodash.merge')
const stripIndent = require('common-tags/lib/stripIndent')
const crypto = require('crypto')
const uuid = require('uuid') // TODO: migrate to `crypto.getRandomUUID` when removing support for Node.js <14.

const utils = require('../server/helpers/utils')
const logger = require('../server/logger')
// @ts-ignore
const { version } = require('../../package.json')

/**
 * Reads all companion configuration set via environment variables
 * and via the config file path
 *
 * @returns {object}
 */
exports.getCompanionOptions = (options = {}) => {
  return merge({}, getConfigFromEnv(), getConfigFromFile(), options)
}

/**
 * Loads the config from environment variables
 *
 * @returns {object}
 */
const getConfigFromEnv = () => {
  const uploadUrls = process.env.COMPANION_UPLOAD_URLS
  const domains = process.env.COMPANION_DOMAINS || process.env.COMPANION_DOMAIN || null
  const validHosts = domains ? domains.split(',') : []

  const envConfig = {
    providerOptions: {
      drive: {
        key: process.env.COMPANION_GOOGLE_KEY,
        secret: getSecret('COMPANION_GOOGLE_SECRET'),
        credentialsURL: process.env.COMPANION_GOOGLE_KEYS_ENDPOINT,
      },
      dropbox: {
        key: process.env.COMPANION_DROPBOX_KEY,
        secret: getSecret('COMPANION_DROPBOX_SECRET'),
        credentialsURL: process.env.COMPANION_DROPBOX_KEYS_ENDPOINT,
      },
      box: {
        key: process.env.COMPANION_BOX_KEY,
        secret: getSecret('COMPANION_BOX_SECRET'),
      },
      instagram: {
        key: process.env.COMPANION_INSTAGRAM_KEY,
        secret: getSecret('COMPANION_INSTAGRAM_SECRET'),
        credentialsURL: process.env.COMPANION_INSTAGRAM_KEYS_ENDPOINT,
      },
      facebook: {
        key: process.env.COMPANION_FACEBOOK_KEY,
        secret: getSecret('COMPANION_FACEBOOK_SECRET'),
        credentialsURL: process.env.COMPANION_FACEBOOK_KEYS_ENDPOINT,
      },
      onedrive: {
        key: process.env.COMPANION_ONEDRIVE_KEY,
        secret: getSecret('COMPANION_ONEDRIVE_SECRET'),
        credentialsURL: process.env.COMPANION_ONEDRIVE_KEYS_ENDPOINT,
      },
      zoom: {
        key: process.env.COMPANION_ZOOM_KEY,
        secret: getSecret('COMPANION_ZOOM_SECRET'),
        verificationToken: getSecret('COMPANION_ZOOM_VERIFICATION_TOKEN'),
        credentialsURL: process.env.COMPANION_ZOOM_KEYS_ENDPOINT,
      },
      // TODO: remove the redundant searchProviders warpper in next major version
      searchProviders: {
        unsplash: {
          key: process.env.COMPANION_UNSPLASH_KEY,
          secret: process.env.COMPANION_UNSPLASH_SECRET,
        },
      },
      // TODO: move s3 out of providerOptions, it's a destination, not a source
      s3: {
        key: process.env.COMPANION_AWS_KEY,
        secret: getSecret('COMPANION_AWS_SECRET'),
        bucket: process.env.COMPANION_AWS_BUCKET,
        endpoint: process.env.COMPANION_AWS_ENDPOINT,
        region: process.env.COMPANION_AWS_REGION,
        useAccelerateEndpoint:
          process.env.COMPANION_AWS_USE_ACCELERATE_ENDPOINT === 'true',
        expires: parseInt(process.env.COMPANION_AWS_EXPIRES || '300', 10),
        acl: process.env.COMPANION_AWS_DISABLE_ACL === 'true' ? null : (process.env.COMPANION_AWS_ACL || 'public-read'), // todo default to no ACL in next major and remove COMPANION_AWS_DISABLE_ACL
      },
    },
    server: {
      host: process.env.COMPANION_DOMAIN,
      protocol: process.env.COMPANION_PROTOCOL,
      path: process.env.COMPANION_PATH,
      implicitPath: process.env.COMPANION_IMPLICIT_PATH,
      oauthDomain: process.env.COMPANION_OAUTH_DOMAIN,
      validHosts,
    },
    periodicPingUrls: process.env.COMPANION_PERIODIC_PING_URLS ? process.env.COMPANION_PERIODIC_PING_URLS.split(',') : [],
    periodicPingInterval: process.env.COMPANION_PERIODIC_PING_INTERVAL
      ? parseInt(process.env.COMPANION_PERIODIC_PING_INTERVAL, 10) : undefined,
    periodicPingStaticPayload: process.env.COMPANION_PERIODIC_PING_STATIC_JSON_PAYLOAD
      ? JSON.parse(process.env.COMPANION_PERIODIC_PING_STATIC_JSON_PAYLOAD) : undefined,
    periodicPingCount: process.env.COMPANION_PERIODIC_PING_COUNT
      ? parseInt(process.env.COMPANION_PERIODIC_PING_COUNT, 10) : undefined,
    filePath: process.env.COMPANION_DATADIR,
    redisUrl: process.env.COMPANION_REDIS_URL,
    // adding redisOptions to keep all companion options easily visible
    //  redisOptions refers to https://www.npmjs.com/package/redis#options-object-properties
    redisOptions: {},
    sendSelfEndpoint: process.env.COMPANION_SELF_ENDPOINT,
    uploadUrls: uploadUrls ? uploadUrls.split(',') : null,
    secret: getSecret('COMPANION_SECRET') || generateSecret(),
    preAuthSecret: getSecret('COMPANION_PREAUTH_SECRET') || generateSecret(),
    allowLocalUrls: process.env.COMPANION_ALLOW_LOCAL_URLS === 'true',
    // cookieDomain is kind of a hack to support distributed systems. This should be improved but we never got so far.
    cookieDomain: process.env.COMPANION_COOKIE_DOMAIN,
    streamingUpload: process.env.COMPANION_STREAMING_UPLOAD === 'true',
    maxFileSize: process.env.COMPANION_MAX_FILE_SIZE ? parseInt(process.env.COMPANION_MAX_FILE_SIZE, 10) : undefined,
    chunkSize: process.env.COMPANION_CHUNK_SIZE ? parseInt(process.env.COMPANION_CHUNK_SIZE, 10) : undefined,
    clientSocketConnectTimeout: process.env.COMPANION_CLIENT_SOCKET_CONNECT_TIMEOUT
      ? parseInt(process.env.COMPANION_CLIENT_SOCKET_CONNECT_TIMEOUT, 10) : undefined,
  }

  // todo remove COMPANION_S3_GETKEY_SAFE_BEHAVIOR in next major and use this getKey implementation instead by default
  if (process.env.COMPANION_S3_GETKEY_SAFE_BEHAVIOR === 'true') {
    envConfig.providerOptions.s3.getKey = (req, filename) => `${uuid.v4()}-${filename}`
  }

  return envConfig
}

/**
 * Tries to read the secret from a file if the according environment variable is set.
 * Otherwise it falls back to the standard secret environment variable.
 *
 * @param {string} baseEnvVar
 *
 * @returns {string}
 */
const getSecret = (baseEnvVar) => {
  const secretFile = process.env[`${baseEnvVar}_FILE`]
  return secretFile
    ? fs.readFileSync(secretFile).toString()
    : process.env[baseEnvVar]
}

/**
 * Auto-generates server secret
 *
 * @returns {string}
 */
const generateSecret = () => {
  logger.warn('auto-generating server secret because none was specified', 'startup.secret')
  return crypto.randomBytes(64).toString('hex')
}

/**
 * Loads the config from a file and returns it as an object
 *
 * @returns {object}
 */
const getConfigFromFile = () => {
  const path = getConfigPath()
  if (!path) return {}

  const rawdata = fs.readFileSync(getConfigPath())
  // @ts-ignore
  return JSON.parse(rawdata)
}

/**
 * Returns the config path specified via cli arguments
 *
 * @returns {string}
 */
const getConfigPath = () => {
  let configPath

  for (let i = process.argv.length - 1; i >= 0; i--) {
    const isConfigFlag = process.argv[i] === '-c' || process.argv[i] === '--config'
    const flagHasValue = i + 1 <= process.argv.length
    if (isConfigFlag && flagHasValue) {
      configPath = process.argv[i + 1]
      break
    }
  }

  return configPath
}

/**
 *
 * @param {string} url
 */
exports.hasProtocol = (url) => {
  return url.startsWith('http://') || url.startsWith('https://')
}

exports.buildHelpfulStartupMessage = (companionOptions) => {
  const buildURL = utils.getURLBuilder(companionOptions)
  const callbackURLs = []
  Object.keys(companionOptions.providerOptions).forEach((providerName) => {
    // s3 does not need redirect_uris
    if (providerName === 's3') {
      return
    }

    callbackURLs.push(buildURL(`/connect/${providerName}/redirect`, true))
  })

  return stripIndent`
    Welcome to Companion v${version}
    ===================================

    Congratulations on setting up Companion! Thanks for joining our cause, you have taken
    the first step towards the future of file uploading! We
    hope you are as excited about this as we are!

    While you did an awesome job on getting Companion running, this is just the welcome
    message, so let's talk about the places that really matter:

    - Be sure to add ${callbackURLs.join(', ')} as your Oauth redirect uris on their corresponding developer interfaces.
    - The URL ${buildURL('/metrics', true)} is available for  statistics to keep Companion running smoothly
    - https://github.com/transloadit/uppy/issues - report your bugs here

    So quit lollygagging, start uploading and experience the future!
  `
}
