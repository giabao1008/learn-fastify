import DBMigrate from 'db-migrate';


const applyMigration = () => {
    return new Promise((resolve, reject) => {
        const dbMigrate = DBMigrate.getInstance(true);
        dbMigrate.silence(true);
        dbMigrate.up((error, result = []) => {
            if (error) {
                reject(console.error(error))
            }
            resolve(result.length)
        })
    })
}

export default applyMigration