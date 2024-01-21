export const config = {
  apiUrl: 'http://ninemed.somee.com/api',
  authRoles: {
    sa: ['Administrador'], 
    medico: ['Administrador', 'ProfissionalSaude'], 
    editor: ['Administrador', 'Recpcao'], 
  }
}