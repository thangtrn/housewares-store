import express, { Application, Handler } from "express";
import { IRouter } from "~/decorators/Methods";
import MetadataKeys from "./metadata.key";
import Controller from "~/decorators/Controller";

function controllerRegister (app: Application, controllers:any[]){
   const info: Array<{api:string; handler:string} > = [];
   controllers.forEach((controller)=>{
       const controllerInstance : {[handlerName:string]:Handler} = new controller();
       let basePath :string = Reflect.getMetadata(MetadataKeys.BASE_PATH, controller);
       
       const routers:IRouter[] = Reflect.getMetadata(MetadataKeys.ROUTER, controller);
       const expresRouter = express.Router();
       routers.forEach(({method, handlerName, handlerPath, middlewares }) => {
           if(middlewares){
               expresRouter[method](
                   handlerPath,
                   ...middlewares,
                   controllerInstance[String(handlerName)].bind(controllerInstance)
                   )
                  
           } else {
               expresRouter[method](
                   handlerPath, 
                   controllerInstance[String(handlerName)].bind(controllerInstance)
               )
           }
           info.push({api:`${method.toLocaleLowerCase()} ${basePath + handlerPath}`,handler:`${Controller.name} ${String(handlerName)}`})
       });
       app.use(basePath, expresRouter);
       console.table(info);
   }) 
}

export default controllerRegister