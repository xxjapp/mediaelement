'use strict';

import {config} from '../player';
import MediaElementPlayer from '../player';
import {renderer} from '../core/renderer';
import {getTypeFromFile} from '../utils/media';

/**
 * VR support
 *
 * This feature uses Google's VR View and creates an <iframe> that allows the user to see 360 videos.
 * @see https://developers.google.com/vr/concepts/vrview-web
 */


// Feature configuration
Object.assign(config, {
	/**
	 * @type {Boolean}
	 */
	supportVR: false,
	/**
	 * https://developers.google.com/vr/concepts/vrview-web#vr_view
	 */
	vr: {
		// customs
		path: '//storage.googleapis.com/vrview/2.0/build/vrview.min.js',
		image: '',
		is_stereo: true,
		is_autopan_off: true,
		is_debug: false,
		is_vr_off: false,
		default_yaw: 0,
		is_yaw_only: false
	}
});

Object.assign(MediaElementPlayer.prototype, {

	/**
	 * Feature constructor.
	 *
	 * Always has to be prefixed with `build` and the name that will be used in MepDefaults.features list
	 * @param {MediaElementPlayer} player
	 * @param {$} controls
	 * @param {$} layers
	 * @param {HTMLElement} media
	 */
	buildvr: function (player, controls, layers, media) {

		let t = this;

		// Currently it only accepts MP4, DASH and HLS
		if (!t.isVideo || !t.options.supportVR || (t.isVideo && t.media.rendererName !== null &&
			!t.media.rendererName.match(/(native\_(dash|hls)|html5)/))) {
			return;
		}

		let
			url = media.getSrc(),
			mediaFiles = [{src: url, type: getTypeFromFile(url)}],
			renderInfo = renderer.select(mediaFiles, ['vr'])
		;

		media.changeRenderer(renderInfo.rendererName, mediaFiles);
	}
});
