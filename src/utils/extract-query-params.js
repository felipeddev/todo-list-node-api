// ?search=Duarte&sort=asc
export function extractQueryParams(rawQueryParams) {
  if (!rawQueryParams) return {}

  const trimmedQueryParams = rawQueryParams.substr(1) // search=Duarte&sort=asc
  const splittedParams = trimmedQueryParams.split('&') // ['search=Duarte', 'sort=asc']
  const queryParams = splittedParams.reduce((queryParams, param) => {
    const [key, value] = param.split('=') // ['search', 'Duarte'], ['sort', 'asc']

    queryParams[key] = value
    return queryParams
  }, {})

  return queryParams
}