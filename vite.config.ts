
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // La proprietà base assicura che tutti i percorsi generati (JS, CSS, Immagini)
  // inizino con il nome della sottocartella del progetto invece che dalla radice /.
  base: '/AchilleCastiglioni/',
  plugins: [react()],
  build: {
    // Assicuriamoci che la cartella di output sia quella standard
    outDir: 'dist',
    // Gli asset verranno messi in /AchilleCastiglioni/assets/
    assetsDir: 'assets',
  }
});
