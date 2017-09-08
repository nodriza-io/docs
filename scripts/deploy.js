const env = require('node-env-file')
env('./env/env')
const fs = require('fs')
const async = require('async')
const PATH = require('path')
const colors = require('colors')
const dirTree = require('directory-tree')
const AWS = require('aws-sdk')
const mime = require('mime')
const s3 = new AWS.S3()
const cloudfront = new AWS.CloudFront()
const dir = require('node-dir')

const distPath = './dist'
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

function uploadFiles(files, callback) {

	ok('Current upload Job: ' + files.length + ' files pending')

	const opt = {
		// match: /.txt$/,
		exclude: /^\./
	}
	dir.readFiles(distPath, opt, function(err, content, callback) {
		if (err) return error(err)
		callback()
	},function (err, files) {
		if (err) return error(err)
		async.timesLimit(files.length, 10, (i, callback) => {
			let file = files[i]
			ok('Uploading -> ' + file)
			let key = file.slice(distPath.length - 1, file.length)
			const fileStream = fs.createReadStream(file)
			const params = {
		    Bucket: process.env.BUCKET,
		    Key: key,
		    Body: fileStream,
		    ACL: 'public-read',
		    ContentType: mime.lookup(file)
			}
			s3.putObject(params, function(err, etag){
				if (err) return callback(err)
				ok('Done -> ' + file)
				callback()
			})
		}, (err) => {
			if (err) return callback(err)
			callback()
		})
	})
}

if (action == 'complete') {

	var files = []
	const tasks = {
		uploadFiles: (callback) => {
			uploadFiles(files, (err) => {
				if (err) return callback(err)
				callback()
			})
		}
	}
	async.series(tasks, (err) => {
		if (err) return error(err)
		ok('Job Done, ' + files.length + ' files has been uploded successfully!')
	})

} else if (action == 'clear') {

	// Clear s3 bucket and invalidate cloudFront files to clear CDN Cache

} else {
	throw Error('No action specified :(')
}
