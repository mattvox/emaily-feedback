const args = ['install']
const opts = { stdio: 'inherit', cwd: 'client', shell: true }
require('child_process').spawn('yarn', args, opts)
