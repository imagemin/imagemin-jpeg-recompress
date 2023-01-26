export type Options = {
	/**
	Favor accuracy over speed.

	@default false
	*/
	readonly accurate?: boolean;

	/**
	Set a quality preset.

	@default 'medium'
	*/
	readonly quality?: 'low' | 'medium' | 'high' | 'veryhigh';

	/**
	Set [comparison method](https://github.com/danielgtaylor/jpeg-archive#image-comparison-metrics).

	@default 'ssim'
	*/
	readonly method?: 'mpe' | 'ssim' | 'ms-ssim' | 'smallfry';

	/**
	Set target quality.

	@default 0.999
	*/
	readonly target?: number;

	/**
	Minimum JPEG quality.

	@default 40
	*/
	readonly min?: number;

	/**
	Maximum JPEG quality.

	@default 95
	*/
	readonly max?: number;

	/**
	Set the number of attempts.

	@default 6
	*/
	readonly loops?: number;

	/**
	Set defish strength.

	@default 0
	*/
	readonly defish?: number;

	/**
	Enable progressive encoding.

	@default true
	*/
	readonly progressive?: boolean;

	/**
	Set subsampling method. Available values: `default`, `disable`.

	@default 'default'
	*/
	readonly subsample?: 'default' | 'disable';

	/**
	Strips metadata, such as EXIF data.

	@default true
	*/
	readonly strip?: boolean;
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
