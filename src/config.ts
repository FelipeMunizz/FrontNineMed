export const config = {
  apiUrl: 'https://localhost:7017/api',
  authRoles: {
    sa: ['Administrador'], 
    medico: ['Administrador', 'ProfissionalSaude'], 
    editor: ['Administrador', 'Recpcao'], 
  }
}
