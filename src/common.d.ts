declare module '*.scss';
declare module '*.jpg';
declare module "react-loadable";
declare module '*.jpeg';
declare module '*.gif';
interface AjaxConfig {
    mainDomain:string
}
declare module '*common/ajaxConfig.js' {
    const config:AjaxConfig;
    export {config};
}