// Демо-данные для самостоятельной сборки (Vercel). В Laravel приходят из GET /api/profile.
export const avantiMockProfile = {
  user: {
    firstName: 'Marco',
    lastName: 'Rossi',
    email: 'ikoei@09gmail.com',
    emailVerified: false,
    emailChangeAllowed: true,
    avatar: '/images/avanti_user_avatar.jpg',
    approvedAmount: 12000,
    documentType: 'Passaporto',
    documentNumber: 'AB1234567',
    iban: '',
  },
  steps: [
    { key: 'simulation', short: 'Simul.', title: 'Simulazione completata', icon: 'chart', status: 'done' },
    { key: 'approval', short: 'Approv.', title: 'Credito approvato', icon: 'shield', status: 'done' },
    { key: 'account', short: 'Account', title: 'Account creato', icon: 'user', status: 'done' },
    { key: 'documents', short: 'Docum.', title: 'Documenti caricati', icon: 'upload', status: 'current' },
    { key: 'signature', short: 'Firma', title: 'Contratto firmato', icon: 'pen', status: 'pending' },
  ],
  consultant: {
    name: 'Schierano Deborah',
    avatar: '/images/avanti_consultant_avatar.jpg',
    message: 'Salve. Mi chiamo Deborah, sarò la sua consulente personale per tutta la pratica.',
    unread: 2,
  },
  notifications: 4,
}
