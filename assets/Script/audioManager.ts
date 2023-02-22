import { _decorator, Node, AudioSource } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('audioManager')
 class audioManager{
    private static _instance : audioManager;
    private _audioSource : AudioSource;

    private audioMananger()
    {}

    public static getInstance()
    {
        if(!audioManager._instance)
        {
            audioManager._instance = new audioManager();
        }

        return audioManager._instance;
    }

    public loadAudioSource(audiSource:AudioSource)
    {
        this._audioSource = audiSource;
    }

    public play()
    {
        this._audioSource.play();
    }

    public pause()
    {
        this._audioSource.pause();
    }


    
}

const audioManagerObject = audioManager.getInstance();

export default audioManagerObject;
