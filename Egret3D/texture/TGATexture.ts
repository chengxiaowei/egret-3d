﻿module egret3d {

     /**
     * @class egret3d.TGATexture
     * @classdesc
     * TGA 贴图模式对象
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class TGATexture extends ITexture {

        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        public internalFormat: InternalFormat;

        /**
        * @language zh_CN
        * 贴图颜色格式
        * @version Egret 3.0
        * @platform Web,Native
        */
        public colorFormat: number;

        /**
        * @language zh_CN
        * 贴图mipmap data
        * @version Egret 3.0
        * @platform Web,Native
        */
        public mimapData: Array<MipmapData>;


        /**
        * @language zh_CN
        * 构造函数
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {
            super();
        }

        /**
        * @language zh_CN
        * 上传贴图数据给GPU
        * @param context3D
        * @version Egret 3.0
        * @platform Web,Native
        */
        public upload(context3D: Context3DProxy) {
            if (!this.texture2D) {
                this.texture2D = context3D.creatTexture2D();

                this.texture2D.internalFormat = this.internalFormat;
                this.texture2D.colorFormat = this.colorFormat;
                this.texture2D.mimapData = this.mimapData;
                this.texture2D.smooth = this.smooth;
                this.useMipmap = true;   

                if (this.mimapData && this.mimapData.length > 0) {
                    for (var i: number = 0; i < this.mimapData.length; i++) {
                        context3D.upLoadTextureData(i, this.texture2D);
                    }
                }
                else {
                    context3D.upLoadTextureData(0, this.texture2D);
                }
            }
        }

        /**
        * @language zh_CN
        * 强制上传贴图数据给GPU，强制要求贴图更新。
        * @param context3D
        * @version Egret 3.0
        * @platform Web,Native
        */
        public uploadForcing(context3D: Context3DProxy) {
            context3D.upLoadTextureData(0, this.texture2D);
        }
    }
}