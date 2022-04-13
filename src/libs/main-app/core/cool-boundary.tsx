import React from 'react';
import { withErrorBoundary } from 'react-error-boundary';

function CoolErrorHandler(error, info) {
  const err = `${error.message} \n ${info.componentStack}`;
  console.error('错误堆栈信息如下: ', err); //TODO 监控上报
}

function ErrorFallback() {
  return (
    <div className="crashed-component-container">
      <p className="crashed-text">
        \u6E32\u67D3\u5F02\u5E38\uFF0C\u53EF\u901A\u8FC7\u63A7\u5236\u53F0\u67E5\u770B\u5F02\u5E38\u4FE1\u606F!
      </p>
    </div>
  );
}

function CoolBoundary(component) {
  return withErrorBoundary(component, {
    FallbackComponent: ErrorFallback,
    onError: CoolErrorHandler,
  });
}

export default CoolBoundary;
