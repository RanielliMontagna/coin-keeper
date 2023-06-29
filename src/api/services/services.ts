import { urls } from 'api/urls'
import { axiosPublicInstance } from 'libs/axios'

export async function quotes() {
  return await axiosPublicInstance.get(urls.quotes, {})
}
