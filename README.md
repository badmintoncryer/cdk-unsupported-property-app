# CDK Unsupported Property App

[Web Page](https://d1upnzw71mlot9.cloudfront.net/)

## Description

This page displays a list of unsupported properties in AWS CDK L2 constructs. For more details, visit this [materials](https://speakerdeck.com/badmintoncryer/cdkkontoribiyutonozui-chu-nobi-woyue-eyou-jian-dan-issuenojian-tukefang).

Currently, only support direct inline props properly, and cases using the spread operator are <span className="text-red-500">not</span> supported.
Even if they are actually supported in L2, they are still counted as unsupported properties.

```ts
// Supported
new CfnConstruct(scope, 'Resource', {
  hoge: 'hoge',
  fuga: 123,
});

// Erroneously displayed as unsupported arguments
const props = {
  hoge: 'hoge',
  fuga: 123,
};

new CfnConstruct(scope, 'Resource', {
  ...props,
});
```
