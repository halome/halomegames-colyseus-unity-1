import * as p2 from 'p2';
import { nosync } from 'colyseus';
import Player from './server/modules/Player';

class PhysicsWorld {
    @nosync timeStep:number;
    @nosync world:p2.World;
    @nosync physicsToDOMScale:number = 1;

    public entities: any = {}

    getScaledValue = (value) => {
        return value * this.physicsToDOMScale;
    }

    constructor() {
        this.entities = {}
        this.timeStep = 1/60;
        this.world = new p2.World({
            gravity: [0, 0],
            broadphase: new p2.SAPBroadphase(0)
        });

        this.world.defaultContactMaterial = new p2.ContactMaterial(
            new p2.Material(1), 
            new p2.Material(2),
            { 
                friction: 0, 
                restitution: 0.2 
            }
        );
        
        //top
        this.addGround(800, 10, 400, 5);
        //bottom
        this.addGround(800, 10, 400, 595);

        //left
        this.addGround(10, 600, 5, 300);
        //right
        this.addGround(10, 600, 795, 300);

        const maxBalls = 40//Math.floor(Math.random() * 10) + 5;
        console.log(`maxBalls = ${maxBalls}`);
        for(var i = 0 ; i < maxBalls; i++){
            const x = Math.floor(Math.random() * this.getScaledValue(780)) + 20;
            const y = Math.floor(Math.random() * this.getScaledValue(580)) + 20;

            console.log(`x = ${x}`);
            console.log(`y = ${y}`);
            this.addBody('ball', `physicsball_${i}`, x, y);
        }
    }

    addGround = (w, h, x, y) => {
        const groundShape:p2.Shape = new p2.Box({
            width: this.getScaledValue(w),
            height: this.getScaledValue(h),
        });
        const groundBody:p2.Body = new p2.Body({
            mass:0,
            position:[this.getScaledValue(x), this.getScaledValue(y)]
        });
        groundBody.addShape(groundShape);

        this.world.addBody(groundBody);
    }
    
    public removeBody(id:string) {
        const lengthBefore:number = [...Object.keys(this.entities)].length;
        const body = this.entities[id];
        if(body === undefined){
            return;
        }
        this.world.removeBody(body.p2Body);
        delete this.entities[id];
        const lengthAfter:number = [...Object.keys(this.entities)].length;
        console.log(`lengthBefore = ${lengthBefore}, lengthAfter = ${lengthAfter}`);
    }

    public moveBody(id, axis){
        console.log(`moveBody ${id} by ${JSON.stringify(axis)}`);
        const body = this.entities[id] as Player;
        body.p2Body.velocity = [axis.x*100, axis.y*100];
    }

    public addBody(type:string, id:string, x:number, y:number){
        console.log(`addBod ${id} at ${x} ${y}`);
        const circleBody = new p2.Body({
            mass:5,            
            position:[this.getScaledValue(x), this.getScaledValue(y)],
        });

        const circleShape:p2.Circle = new p2.Circle({ radius: this.getScaledValue(16) });
        circleBody.addShape(circleShape);
         
        console.log(`add body to array`);
        this.entities[id] = new Player(type, circleBody);

        this.world.addBody(circleBody);      
    }

    lastTime;
    maxSubSteps = 5; // Max physics ticks per render frame
    fixedDeltaTime = 1 / 60; // Physics "tick" delta time
    public update() {
        const now = Date.now();
        let deltaTime = this.lastTime ? (now - this.lastTime) / 1000 : 0
        this.lastTime = now;

        deltaTime = Math.min(1 / 10, deltaTime);

        this.world.step(this.fixedDeltaTime, deltaTime, this.maxSubSteps);

        [...Object.keys(this.entities)].forEach(id => {
            const player = this.entities[id] as Player;
            player.update();
        });
    }
}

export default PhysicsWorld;