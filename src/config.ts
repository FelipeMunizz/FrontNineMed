export const config = {
  apiUrl: 'http://ninemed.somee.com/',
  authRoles: {
    sa: ['Administrador'], 
    medico: ['Administrador', 'ProfissionalSaude'], 
    editor: ['Administrador', 'Recpcao'], 
  }
}