import 'dotenv/config'
import { Pool } from 'pg';

const pool = new Pool ({
    user: process.env.pgUSER,
    host: process.env.pgHOST,
    database: process.env.pgDATABASE,
    password: process.env.pgPASSWORD,
    port: Number(process.env.pgPORT)
});

async function testarConexao() {
    try {
        const res = await pool.query('SELECT * from equipamentos');
        console.log('Conexão realizada!!!!!' );
        console.log('Dados do Banco:', res.rows);
    } catch (error) {
        console.error('erro na conexão', error.message);
    } finally {
        await pool.end();
    }
}

testarConexao();

export default pool;