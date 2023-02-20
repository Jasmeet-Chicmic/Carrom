import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player{
    private Black_Count = 0;
    private White_Count = 0;
    private Red_Count = 0;

    setBlackCount()
    {
        this.Black_Count++;
    }
    setWhiteCount()
    {
        this.White_Count++;
    }
    setRedCount()
    {
        this.Red_Count++;
    }

    getScore()
    {
        return (this.Black_Count*10 + this.White_Count*20 + this.Red_Count*50)
    }
    start() {

    }
    

    update(deltaTime: number) {
        
    }
}

