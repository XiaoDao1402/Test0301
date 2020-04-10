
function checkStatus(response:any) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
  
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }


  /**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       请求地址
 * @param  {object} [options] 请求参数
 */
export default async function request(url:string, options:object) {
    const response = await fetch(url, options);
  
    checkStatus(response);
  
    const data = await response.json();
  
    const ret = {
      data
    };
    return ret;
}
