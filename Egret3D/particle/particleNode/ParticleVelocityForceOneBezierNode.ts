﻿module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.ParticleVelocityForceOneBezierNode
    * @classdesc
    * 粒子加速度叠加节点,贝塞尔曲线获得
    * @see egret3d.AnimationNode
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ParticleVelocityForceOneBezierNode extends AnimationNode {

        private _floatCompressDataX: Float32Array;
        private _floatCompressDataY: Float32Array;
        private _floatCompressDataZ: Float32Array;
        private _node: ParticleDataMoveSpeed;
       
        constructor() {
            super();
            this.name = "ParticleVelocityForceOneBezierNode";

            this.vertex_ShaderName[ShaderPhaseType.global_vertex] = this.vertex_ShaderName[ShaderPhaseType.global_vertex] || [];
            this.vertex_ShaderName[ShaderPhaseType.global_vertex].push("particle_velocityForceOneBezier");

        }

        /**
        * @language zh_CN
        * 填充粒子加速度数据
        * @param data ParticleDataNode 粒子数据来源
        * @version Egret 3.0
        * @platform Web,Native
        */
        public initNode(data: ParticleDataNode): void {
            this._node = <ParticleDataMoveSpeed>data;
            this._floatCompressDataX = this._node.velocityForce.xBezier1.compress();
            this._floatCompressDataY = this._node.velocityForce.yBezier1.compress();
            this._floatCompressDataZ = this._node.velocityForce.zBezier1.compress();
        }
        /**
        * @language zh_CN
        * 填充顶点数据
        * @param geometry 网格数据
        * @param count 粒子数量
        * @version Egret 3.0
        * @platform Web,Native
        */
        public build(geometry: Geometry, count: number) {
            
        }



        /**
        * @private
        */
        public activeState(time: number, animTime: number, delay: number, animDelay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy) {
            context3DProxy.uniform1fv(usage["uniform_velocityForceX"].uniformIndex, this._floatCompressDataX);
            context3DProxy.uniform1fv(usage["uniform_velocityForceY"].uniformIndex, this._floatCompressDataY);
            context3DProxy.uniform1fv(usage["uniform_velocityForceZ"].uniformIndex, this._floatCompressDataZ);
        }



    }
} 