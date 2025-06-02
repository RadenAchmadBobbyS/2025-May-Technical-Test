import { apiClient } from './client'

/**
 * TASK: use `apiClient` to fetch list of diary content
 *
 * @example
 * `GET /cms/diary?id=359007&id=358317&id=343275&status=posted`
 * 
 * Note that:
 * - `status` param must exist and have value of `'posted'`
 */
export async function getDiaryFeed() {
  const ids = [
    359007,
    358317,
    343275,
    342861,
    342723,
    342240,
    341343,
    296907,
    253782,
    177123,
  ]
  const queryParams = ids.map(id => `id=${id}`).join('&') + '&status=posted'
  const url = `/cms/diary?${queryParams}`

  return await apiClient(url);
}

/**
 * TASK: use `apiClient` to fetch diary content by id
 *
 * @example
 * `GET /cms/diary?id=359007&status=posted`
 * 
 * Note that:
 * - `status` param must exist and have value of `'posted'`
 */
export async function getDiaryContentById(id) {
  const url = `/cms/diary?id=${id}&status=posted`
  return await apiClient(url)
}
