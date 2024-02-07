export const config = {
  apiUrl: 'https://localhost:7017/api',
  //apiUrl: 'https://ninemed.azurewebsites.net/api',
  authRoles: {
    teste: ['teste'],
    sa: ['Administrador'], 
    medico: [ 'Administrador','ProfissionalSaude'], 
    recepcao: ['Administrador', 'Recpcao'], 
  }
}

