const settings = {
  protocol: 'http',
  host: 'localhost',
  port: null,
  domain:'trs_api/public/api',
}
settings.url = `${settings.protocol}://${settings.host}${settings.port ? ':this.port'  : ''}/${settings.domain}`

export default settings