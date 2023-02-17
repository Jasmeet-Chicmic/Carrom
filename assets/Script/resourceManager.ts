import { Sprite, SpriteFrame, resources } from "cc";

class resourceManager {

    //GLOBAL ARRAY FOR STORING ACCESED SPRITEFRAMES
    spriteFrameArray: SpriteFrame[] = [];
    static instance: resourceManager;

    //PRIVATE CONSTRUCTOR SO THAT USER DO NOT ABLE TO CREATE THE INSTANCE
    private constructor() {
    }


    // CREATING INSTANCE OF SINGLETON CLASS (dynamicResourceLoader)
    public static getInstance(): resourceManager {
        if (!resourceManager.instance) {
            resourceManager.instance = new resourceManager();
        }
        return resourceManager.instance;
    }


    //LOADING THE RESOURCES USING resources.loadDir() function 
    public preLoadResources() {
        resources.preloadDir('Carrom', SpriteFrame);
        return new Promise<SpriteFrame[]>((resolve, reject) => {
            resources.loadDir('Carrom', SpriteFrame, (err, assets: SpriteFrame[]) => {
                if (!err) {
                    this.spriteFrameArray = assets;
                    return resolve(this.spriteFrameArray);
                }
                else { return reject(err); }
            });
        })
    }

    // RETURNS THE INDEX OF OBJECT BY COMPARING THE NAME PROPERTY OF OBJECT 
    /**
     * 
     * @param name 
     * @returns Index of sprite object
     */
    public assetIndex(name: string): number {
        let spriteFrameIndex = this.spriteFrameArray.findIndex(spriteFrameObj => spriteFrameObj.name === name);
        return spriteFrameIndex;
    }

}



//CREATING OBJECT 
let DRL_Obj = resourceManager.getInstance();

export default DRL_Obj;

