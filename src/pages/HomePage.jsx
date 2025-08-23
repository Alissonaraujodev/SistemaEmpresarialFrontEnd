import PublicNavbar from "../components/PublicNavBar";
import "../styles/public.css";

export default function HomePage() {
  // produtos de exemplo
  const produtos = [
    { id: 1, nome: "Produto A", desc: "Descrição breve do produto A." },
    { id: 2, nome: "Produto B", desc: "Descrição breve do produto B." },
    { id: 3, nome: "Produto C", desc: "Descrição breve do produto C." },
  ];

  return (
    <>
      <PublicNavbar />

      {/* Hero */}
      <header className="hero">
        <div className="hero-content">
          <h1>Bem-vindo à SuaEmpresa</h1>
          <p>Gestão simples, vendas rápidas e decisões melhores.</p>
          <a href="#sobre" className="cta">Saiba mais</a>
        </div>
      </header>

      {/* Sobre: Missão, Visão, Valores */}
      <section id="sobre" className="section">
        <h2>Sobre nós</h2>
        <div className="cards">
          <div className="card">
            <h3>Missão</h3>
            <p>Entregar soluções que simplificam a gestão e potencializam resultados.</p>
          </div>
          <div className="card">
            <h3>Visão</h3>
            <p>Ser referência nacional em software de gestão acessível e eficiente.</p>
          </div>
          <div className="card">
            <h3 id="valores">Valores</h3>
            <ul>
              <li>Transparência</li>
              <li>Inovação</li>
              <li>Foco no cliente</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Produtos destacados */}
      <section id="produtos" className="section alt">
        <h2>Produtos em destaque</h2>
        <div className="grid">
          {produtos.map(p => (
            <div key={p.id} className="product">
              <div className="product-thumb" />
              <h4>{p.nome}</h4>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="section">
        <h2>Fale com a gente</h2>
        <p>contato@suaempresa.com.br • (11) 99999-9999</p>
      </section>

      <footer className="footer">
        © {new Date().getFullYear()} SuaEmpresa — Todos os direitos reservados.
      </footer>
    </>
  );
}
