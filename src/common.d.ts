declare module '*.scss';
declare module '*.jpg';
declare module "react-loadable";
declare module "react-document-title";
declare module '*.jpeg';
declare module '*.gif';
declare module '*.js';
// interface AjaxConfig {
//     mainDomain:string
// }
// declare module '*common/ajaxConfig.js' {
//     const config:AjaxConfig;
//     export {config};
// }
interface Document {
    selection:any
}
declare var document:Document;

interface Window {
    clipboardData?:any
    attachEvent?:any
    detachEvent?:any
}
declare var window:Window;

declare module 'BMap';