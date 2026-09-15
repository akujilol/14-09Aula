import { pool } from "../database/db.js"

class EquipamentoService {
  async listarTodos() {
    const { rows } = await pool.query(
      "SELECT * FROM equipamentos"
    );
    return rows;
  }

  async buscarPorId(id) {
    const { rows } = await pool.query(
      'SELECT id, nome, tipo, disponivel FROM equipamentos WHERE id = $1',
      [id]
    );
    return rows[0] ?? null;
  }
  async cadastrar({ nome, tipo, disponivel = true }) {
    const { rows } = await pool.query(
      `INSERT INTO equipamentos (nome, tipo, disponivel)
       VALUES ($1, $2, $3)
       RETURNING id, nome, tipo, disponivel`,
      [nome, tipo, disponivel]
    );
    return rows[0];
  }
  async atualizarDisponibilidade(id, disponivel) {
    const { rows } = await pool.query(
      `UPDATE equipamentos
       SET disponivel = $1
       WHERE id = $2
       RETURNING id, nome, tipo, disponivel`,
      [disponivel, id]
    );
    return rows[0] ?? null;
  }
}

export const equipamentoService = new EquipamentoService()