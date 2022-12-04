export type Options = {
	/**
	Favor accuracy over speed.

	@default false
	*/
	accurate?: boolean;

	/**
	Set a quality preset.

	@default 'medium'
	*/
	quality?: 'low' | 'medium' | 'high' | 'veryhigh';

	/**
	Set [comparison method](https://github.com/danielgtaylor/jpeg-archive#image-comparison-metrics)

	@default 'ssim'
	*/
	method?: 'mpe' | 'ssim' | 'ms-ssim' | 'smallfry';

	/**
	Set target quality.

	@default 0.999
	*/
	target?: number;

	/**
	Minimum JPEG quality.

	@default 40
	*/
	min?: number;

	/**
	Maximum JPEG quality.

	@default 95
	*/
	max?: number;

	/**
	Set the number of attempts.

	@default 6
	*/
	loops?: number;

	/**
	Set defish strength.

	@default 0
	*/
	defish?: number;

	/**
	Enable progressive encoding.

	@default true
	*/
	progressive?: boolean;

	/**
	Set subsampling method. Available values: `default`, `disable`.

	@default 'default'
	*/
	subsample?: 'default' | 'disable';

	/**
	Strips metadata, such as EXIF data.

	@default true
	*/
	strip?: boolean;
};

/**
Buffer or stream to optimize.
*/
export type Plugin = (input: Buffer | NodeJS.ReadableStream) => Promise<Buffer>;

/**
Imagemin plugin for jpeg-recompress.

@returns An Imagemin plugin.
*/
export default function imageminJpegRecompress(options?: Options): Plugin;
