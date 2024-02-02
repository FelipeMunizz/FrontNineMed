export const config = {
  //apiUrl: 'https://localhost:7017/api',
  apiUrl: 'https://ninemed.somee.com/api',
  authRoles: {
    sa: ['Administrador'], 
    medico: ['Administrador', 'ProfissionalSaude'], 
    editor: ['Administrador', 'Recpcao'], 
  }
}

