import { AxiosError, AxiosResponse } from 'axios';

// 请求成功: 返回的code 做不同的业务
class ServerResponseSuccessManager {
  /**
   * 状态码解析器
   */
  codeParser(response: AxiosResponse) {
    const code = response?.data?.errCode;
    // const resData = response?.data?.data;
    const parser = {
      '10010': () => {
        // this.handleCodeIsCurrent(resData);
      },
      default: () => console.log('code 无法识别'),
    };

    return parser[code] ? parser[code]() : parser.default;
  }
}

// 针对请求失败的响应处理
class ServerResponseFailManager {
  /**
   * 请求失败，需要提示信息
   */

  getErrorMessage(error: AxiosError) {
    console.error('error.response === ', error.response);
  }
}

export const serverResponseSuccessManager = new ServerResponseSuccessManager();
export const serverResponseFailManager = new ServerResponseFailManager();
