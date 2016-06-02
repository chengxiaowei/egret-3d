﻿module egret3d {
        
    /**
    * @language zh_CN
    * @class egret3d.ParticleColorGlobalNode
    * @classdesc
    * 颜色渐变
    * @see egret3d.AnimationNode
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ParticleColorGlobalNode extends AnimationNode {

        /**
        * @private
        * 最大支持的颜色变化数量
        */
        private static MaxColor: number = 8;
        private _colorSegment: Float32Array = new Float32Array(ParticleColorGlobalNode.MaxColor * 2 ); 
        constructor() {

            super();
            this.name = "ParticleColorGlobalNode"; 

            this.vertex_ShaderName[ShaderPhaseType.global_vertex] = this.vertex_ShaderName[ShaderPhaseType.global_vertex] || [];
            this.vertex_ShaderName[ShaderPhaseType.global_vertex].push("particle_color_vs");
            
            this.fragment_ShaderName[ShaderPhaseType.multi_end_fragment] = this.fragment_ShaderName[ShaderPhaseType.multi_end_fragment] || [];
            this.fragment_ShaderName[ShaderPhaseType.multi_end_fragment].push("particle_color_fs");

        }

        /**
        * @language zh_CN
        * 填充粒子颜色变化数据
        * @param data ParticleDataNode 粒子数据来源
        * @version Egret 3.0
        * @platform Web,Native
        */
        public initNode(data: ParticleDataNode): void {
            var node: ParticleDataColorOffset = <ParticleDataColorOffset>data;
            var count: number = ParticleColorGlobalNode.MaxColor;
            node.colors.length = node.times.length = count;

            var color: Color;
            for (var i: number = 0; i < count; i++) {
                color = node.colors[i];
                if (color) {
                    //这里采用了压缩方法：rgb三个数值压缩到一个float，a和time压缩放到第二个float
                    //然后在gpu中还原
                    this._colorSegment[i] = this.getGpuColor(color.r, color.g, color.b);
                    this._colorSegment[i + count] = this.getTimeAndAlpha(node.times[i], color.a);
                }
                else {
                    this._colorSegment[i] = 0;
                    this._colorSegment[i + count] = 0;
                }
            }
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
        public update(time: number, delay: number, geometry: Geometry) {
        }

        /**
        * @private
        */
        public activeState(time: number, animTime: number, delay: number, animDelay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy) {
            context3DProxy.uniform1fv(usage["uniform_colorTransform"].uniformIndex, this._colorSegment);
        }

        /**
        * @压缩一个颜色值到一个float中
        */
        private getGpuColor(r: number, g: number, b: number): number {
            r = this.normalizeChannel(r);
            g = this.normalizeChannel(g);
            b = this.normalizeChannel(b);

            var value: number = r * 0x100 + g + b / 0x100;
            return value;
        }

        private normalizeChannel(value: number): number {
            if (value > 0xff) value = 0xff;
            else if (value < 0) value = 0;
            value = Math.floor(value);
            return value;
        }
        private normalizeTime(value: number): number {
            //注：value是一个0-1之间的数，而非真实的秒时间
            //所以超过1将为无效会被设定成为一个接近1的数
            if (value >= 1) value = 0.9999;
            else if (value < 0) value = 0;
            return value;
        }

        private getTimeAndAlpha(time: number, a: number): number {
            a = this.normalizeChannel(a);
            time = this.normalizeTime(time);
            return a + time;
        }
    }
} 