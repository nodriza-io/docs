const env = require('node-env-file')
env('./env/env')
const fs = require('fs')
const async = require('async')
const PATH = require('path')
const colors = require('colors')
const dirTree = require('directory-tree')
const mime = require('mime')
const AWS = require('aws-sdk')
const s3 = new AWS.S3(new AWS.Config({accessKeyId: process.env.AWS_ACCESS_KEY, secretAccessKey: process.env.AWS_SECRET_KEY}))
const dir = require('node-dir')
let uploads = 0
const distPath = process.env.SOURCE_DIR
const action = process.argv[2]

if (!process.env.BUCKET || !process.env.AWS_ACCESS_KEY || !process.env.AWS_SECRET_KEY) {
	throw Error('No enviroment vars present, please: cp ./env/env.template to ./env/env and set variables.')
}

function ok (str) {
	console.log('> ' + str, '[ OK ]'.green)
}

function error (str) {
	console.log('> ' + str, '[ ERROR ]'.red)
}

function uploadFiles(callback) {

	let files
	const opt = {
		// match: /.txt$/,
		exclude: /^\./
	}
	dir.readFiles(distPath, opt, function(err, content, callback) {
		if (err) return error(err)
		callback()
	},function (err, _files) {
		if (err) return error(err)	
		files = _files
		ok('Current upload Job: ' + files.length + ' files in queue')
		async.timesLimit(files.length, parseInt(process.env.PARALLEL), (i, callback) => {
			let file = files[i]
			const size = fs.statSync(file).size

			let key = file.slice(distPath.length + 1, file.length)
			var params = {
		    Bucket: process.env.BUCKET,
		    Key: key
			}
			s3.headObject(params, function(err, data) {
				// Check if file exist or modified
				if (data && data.ContentLength === size) return callback()
				ok('Uploading -> ' + file.blue + ' Size: ' + size + ' Bytes')
				const fileStream = fs.createReadStream(file)
				var params = {
			    Bucket: process.env.BUCKET,
			    Key: key,
			    Body: fileStream,
			    ACL: process.env.ACL,
			    ContentType: mime.lookup(file)
				}

				s3.putObject(params, function(err, etag) {
					delete params.Body
					if (err) return callback(err)
					uploads++
					ok('Done -> ' + file + ' to -> https://s3.amazonaws.com/' + process.env.BUCKET)
					callback()
				})
			})

		}, (err) => {
			if (err) return callback(err)
			callback(null, files)
		})
	})
}

if (action == 'complete') {

	var files
	const tasks = {
		uploadFiles: (callback) => {
			uploadFiles((err, _files) => {
				if (err) return callback(err)
				files = _files
				callback()
			})
		}
	}
	async.series(tasks, (err) => {
		if (err) return error(err)
		ok('Job Done, ' + uploads + ' files has been uploded, ' + (files.length - uploads) + ' has no changes.')
	})

} else if (action == 'clear') {

	// Clear s3 bucket and invalidate cloudFront files to clear CDN Cache

} else {
	throw Error('No action specified :(')
}
