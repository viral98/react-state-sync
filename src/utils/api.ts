interface FetchProps {
  header?: string
}

const api = ({ header }: FetchProps) => {
  const { fetch: originalFetch } = window

  const updatedFetch = async (input: RequestInfo, init: RequestInit) => {
    if (header) {
      init.headers = {
        ...init.headers,
        'Content-Type': 'application/vnd.api+json',
        Accept: 'application/vnd.api+json',
        Authorization: 'Bearer ' + header
      }
    }

    // request interceptor here
    const response = await originalFetch(input, init)

    return response
  }

  return updatedFetch
}

export default api
