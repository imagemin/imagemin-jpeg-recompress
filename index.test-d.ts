import * as fs from 'fs';
import * as path from 'path';
import {expectType} from 'tsd';
import imageminJpegRecompress from '.';

const buffer = fs.readFileSync(path.join(__dirname, 'fixture.jpg'));

(async () => {
	expectType<Buffer>(await imageminJpegRecompress()(buffer));
	expectType<Buffer>(await imageminJpegRecompress({
		defish: 1,
		quality: 'medium',
		accurate: true,
		loops: 10,
		progressive: true,
		subsample: 'default',
		min: 40,
		max: 95
	})(buffer));
})();
