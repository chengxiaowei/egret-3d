﻿module egret3d {

    /**
    * @private
    */
    export class UVRollMethod extends MethodBase {

        private _uvRoll: Float32Array = new Float32Array(2);
        private _speedU: number = 0.00005;
        private _speedV: number = 0.0;
        private _time: number = 0.0;
        private _start: boolean = false;
        /**
         * @language zh_CN
         * @param texture 
         */
        constructor() {
            super();
            this.fsShaderList.push("uvRoll_fs");
            this.methodType = TextureMethodType.diffuse;
        }

        public set speedU(value: number) {
            this._speedU = value;
        }

        public get speedU(): number {
            return this._speedU;
        }

        public set speedV(value: number) {
            this._speedV = value;
        }

        public get speedV(): number {
            return this._speedV;
        }

        public start(rest: boolean = false) {
            if (rest)
                this._time = 0;
            this._start = true;
        }

        public stop() {
            this._start = false;
        }

        /**
           * @language zh_CN
           * @param time
           * @param delay
           * @param usage
           * @param materialData
           * @param geometry
           * @param context3DProxy
           * @param modeltransform 
           * @param modeltransform
           * @param camera3D
           */
        public upload(time: number, delay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D) {
            usage["uvRoll"] = context3DProxy.getUniformLocation(usage.program3D, "uvRoll");
        }

        public update(time: number, delay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D) {
            if (this._start) {
                this._time += delay;
                this._uvRoll[0] = this._time * this._speedU;
                this._uvRoll[1] = this._time * this._speedV;
                context3DProxy.uniform1fv(usage["uvRoll"], this._uvRoll);
            }
        }
    }
}
