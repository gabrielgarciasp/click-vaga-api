import app from './app'

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('🔥 Server started in port', port)
    console.log('⚙️ Configs:')
    console.log(
        '👓 Synchronize Database:',
        process.env.DB_SYNCHRONIZE === 'true'
    )
    console.log('👓 Send Emails:', process.env.SEND_EMAIL === 'true')
    console.log('👓 Debug Mode:', process.env.DEBUG_MODE === 'true')
})
