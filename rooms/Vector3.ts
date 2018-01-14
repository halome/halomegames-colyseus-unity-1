class Vector3 {
    public x: number;
    public y: number;
    public z: number;

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public add(vector: Vector3) {
        this.x += vector.x;
        this.y += vector.y;
        this.z += vector.z;
    }

    public static fromVector(vector: Vector3): Vector3 {
        return new Vector3(vector.x, vector.y, vector.z);
    }

    public static fromJSON(jsonObject: {x, y, z}): Vector3 {
        return new Vector3(jsonObject.x, jsonObject.y, jsonObject.z);
    }
}

export default Vector3;