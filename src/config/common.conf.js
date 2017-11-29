export default {
    'API_DOMAIN': process.env.ROUTERSOFT_API_DOMAIN === "undefined" ? 'http://mp.rmt.test.routeryuncs.com' : process.env.ROUTERSOFT_API_DOMAIN,
    'OSS_DOMAIN': process.env.ROUTERSOFT_API_DOMAIN === "undefined" ? 'http://mcp.api.test.routeryuncs.com' : process.env.ROUTERSOFT_OSS_DOMAIN,
    'COOKIE_DOMAIN': process.env.ROUTERSOFT_COOKIE_DOMAIN === "undefined" ? 'localhost' : process.env.ROUTERSOFT_COOKIE_DOMAIN,
    'BUILD_CODE': process.env.ROUTERSOFT_BUILDCODE === "undefined" ? '' : process.env.ROUTERSOFT_BUILDCODE
};
