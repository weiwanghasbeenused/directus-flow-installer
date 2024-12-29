// import Image from "next/image";
// import styles from "./page.module.css";
import HomeForm from '@/components/homeForm/HomeForm.js'
import { promises as fs } from 'fs';

export default async function Home() {
  const flows = await fs.readFile(process.cwd() + '/src/json/flows.json', 'utf8')
  const operations = await fs.readFile(process.cwd() + '/src/json/operations.json', 'utf8')
  const config = await fs.readFile(process.cwd() + '/src/json/config.json', 'utf8')
  const relations = await fs.readFile(process.cwd() + '/src/json/relations.json', 'utf8')
  return (
    <div className="page home">
      <main>
        <HomeForm flows_json={flows} operations_json={operations} config_json={config} relations_json={relations}></HomeForm>
      </main>
    </div>
  );
}
