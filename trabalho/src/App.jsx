import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Film, PlusSquare, User, Calendar, MapPin, Star, Clock, DollarSign, CheckCircle,XCircle
} from 'lucide-react';

// --- DADOS MOCKADOS (Parte 1 e Parte 2) ---
// Descrições de atores possuem mais de 30 palavras cada.
const movieData = {
  title: "Barbie",
  description: "No mundo mágico das Barbies, 'Barbieland', uma das bonecas começa a perceber que não se encaixa como as outras. Depois de ser expulsa, ela parte para uma aventura no 'mundo real', onde descobre que a beleza está no interior de cada um.",
  budget: "145000000",
  rating: "7.318",
  duration: "112 min.",
  release: "2023-07-19",
  mainImage: "https://image.tmdb.org/t/p/w1280/ctMserH8g2SeOAnCw5gFjdQF8mo.jpg",
  actors: [
    {
      id: 1,
      name: "Margot Robbie",
      role: "Barbie",
      image: "https://www.tapisrouge.com.br/wp-content/uploads/2024/11/GR55b0SWYAA9JWb.jpeg",
      gender: "Feminino",
      birthdate: "1990-07-02",
      birthplace: "Dalby, Queensland, Austrália",
      description: "Margot Elise Robbie é uma atriz e produtora australiana, aclamada internacionalmente. Ela alcançou a fama mundial com papéis em sucessos como 'O Lobo de Wall Street' e 'Esquadrão Suicida', onde interpretou brilhantemente a Arlequina. Para o filme 'Barbie', Robbie não apenas atuou como a icônica boneca principal, mas também liderou o projeto como produtora, ajudando a moldar a visão criativa e transformando o longa em um fenômeno cultural e de bilheteria sem precedentes no mundo todo.",
      movies: ["Eu, Tonya", "O Esquadrão Suicida", "Era Uma Vez em... Hollywood"]
    },
    {
      id: 2,
      name: "Ryan Gosling",
      role: "Ken",
      image: "https://hips.hearstapps.com/hmg-prod/images/ryan-gosling-attends-the-96th-oscars-nominees-luncheon-at-news-photo-1710014412.jpg?crop=0.753xw:0.523xh;0.175xw,0.0224xh&resize=640:*",
      gender: "Masculino",
      birthdate: "1980-11-12",
      birthplace: "London, Ontário, Canadá",
      description: "Ryan Thomas Gosling é um talentoso ator, músico e diretor canadense, conhecido por sua versatilidade em papéis que vão do romance intense de 'Diário de uma Paixão' à ação de 'Drive'. No papel de Ken, ele trouxe uma mistura hilária e cativante de fragilidade masculina, comédia física e números musicais espetaculares. Sua performance da canção 'I'm Just Ken' rendeu aclamação global e até mesmo uma memorável e vibrante apresentação na cerimônia do Oscar, consolidando seu imenso carisma na indústria.",
      movies: ["La La Land: Cantando Estações", "Blade Runner 2049", "Drive"]
    },
    {
      id: 3,
      name: "America Ferrera",
      role: "Gloria",
      image: "https://www.rollingstone.com/wp-content/uploads/2024/01/America-Ferrera-barbie-monologue.jpg?w=1581&h=1054&crop=1",
      gender: "Feminino",
      birthdate: "1984-04-18",
      birthplace: "Los Angeles, Califórnia, EUA",
      description: "America Georgine Ferrera é uma premiada atriz e produtora norte-americana, mais conhecida por seu papel como protagonista na aclamada série de televisão 'Ugly Betty', que lhe rendeu o Globo de Ouro e o Emmy. Em 'Barbie', Ferrera interpreta Gloria, uma funcionária do mundo real cujos sentimentos e desenhos começam a afetar diretamente a Barbieland. Seu poderoso e inspirador monólogo sobre as impossíveis expectativas impostas às mulheres tornou-se rapidamente uma das cenas mais emblemáticas e discutidas do cinema contemporâneo.",
      movies: ["Ugly Betty", "Quatro Amigas e um Jeans Viajante", "Como Treinar o Seu Dragão"]
    },
    {
      id: 4,
      name: "Kate McKinnon",
      role: "Barbie",
      image: "https://knightedgemedia.com/wp-content/uploads/2022/02/barbie-kate-mckinnon-banner.jpg",
      gender: "Feminino",
      birthdate: "1984-01-06",
      birthplace: "Sea Cliff, Nova York, EUA",
      description: "Kathryn McKinnon Berthold, conhecida profissionalmente como Kate McKinnon, é uma atriz, comediante e roteirista americana. Ela se destacou e conquistou diversos fãs durante sua longa e brilhante passagem pelo programa humorístico 'Saturday Night Live', onde criou dezenas de personagens marcantes. No filme 'Barbie', ela assume o divertido papel da 'Barbie Estranha', aquela boneca que foi brincada com muita intensidade, toda rabiscada e com o cabelo cortado, agindo como uma espécie de guia espiritual excêntrica para a protagonista em crise.",
      movies: ["Caça-Fantasmas", "O Escândalo", "Meu Ex é um Espião"]
    },
    {
      id: 5,
      name: "Ariana Greenblatt",
      role: "Sasha",
      image: "https://metagalaxia.com.br/wp-content/uploads/2023/09/Ariana-Greenblatt.webp",
      gender: "Feminino",
      birthdate: "2007-08-27",
      birthplace: "Nova York, NY, EUA",
      description: "Ariana Greenblatt é uma jovem e talentosa atriz norte-americana em rápida ascensão em Hollywood. Começou a chamar atenção atuando em séries da Disney e logo migrou para grandes blockbusters, como interpretando a jovem Gamora em 'Vingadores: Guerra Infinita'. Em 'Barbie', ela interpreta Sasha, a filha adolescente e rebelde de Gloria, que inicialmente tem uma visão muito cínica e crítica sobre o que a boneca Barbie representa no mundo moderno, mas que acaba se conectando com a magia da Barbieland.",
      movies: ["Vingadores: Guerra Infinita", "Amor e Monstros", "65 - Ameaça Pré-Histórica"]
    },
    {
      id: 6,
      name: "Michael Cera",
      role: "Allan",
      image: "https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2024/02/Michael-Cera-e1709170931864.jpg?w=1200&h=900&crop=1",
      gender: "Masculino",
      birthdate: "1988-06-07",
      birthplace: "Brampton, Ontário, Canadá",
      description: "Michael Austin Cera é um ator e músico canadense, amplamente conhecido por interpretar personagens desajeitados e sensíveis em comédias de sucesso como 'Superbad' e 'Scott Pilgrim Contra o Mundo'. No longa 'Barbie', Cera brilha e rouba a cena no papel de Allan, o único boneco da Barbieland que não é um Ken, atuando como um aliado improvável e hilário na jornada de autodescoberta das Barbies contra o patriarcado.",
      movies: ["Superbad", "Scott Pilgrim Contra o Mundo", "Arrested Development"]
    },
    {
      id: 7,
      name: "Will Ferrell",
      role: "Mattel CEO",
      image: "https://www.nme.com/wp-content/uploads/2023/07/will-ferrell-barbie.jpg",
      gender: "Masculino",
      birthdate: "1967-07-16",
      birthplace: "Irvine, Califórnia, EUA",
      description: "John William Ferrell é um renomado comediante, ator, produtor e escritor americano. Ele se estabeleceu como uma das maiores estrelas da comédia nos anos 2000. No filme 'Barbie', Ferrell traz seu estilo de humor absurdo e característico para o papel do excêntrico e desesperado CEO da Mattel, que tenta a todo custo colocar a Barbie de volta na caixa e manter a ordem nos dois mundos.",
      movies: ["O Âncora", "Um Duende em Nova York", "Quase Irmãos"]
    }
  ]
};


// --- COMPONENTES DE UI ---

const CustomModal = ({ isOpen, onClose, title, message, isError }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl w-full max-w-sm overflow-hidden shadow-2xl transform transition-all">
        <div className={`p-4 flex items-center gap-3 ${isError ? 'bg-red-500' : 'bg-pink-600'} text-white`}>
          {isError ? <XCircle size={24} /> : <CheckCircle size={24} />}
          <h3 className="font-semibold text-lg">{title}</h3>
        </div>
        <div className="p-6">
          <p className="text-gray-700">{message}</p>
        </div>
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
          <button 
            onClick={onClose}
            className={`px-5 py-2 rounded-lg font-medium text-white transition-colors ${isError ? 'bg-red-500 hover:bg-red-600' : 'bg-pink-600 hover:bg-pink-700'}`}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

const Switch = ({ isOn, handleToggle }) => {
  return (
    <div 
      className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ease-in-out ${isOn ? 'bg-pink-600' : 'bg-gray-300'}`} 
      onClick={handleToggle}
    >
      <div 
        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${isOn ? 'translate-x-6' : 'translate-x-0'}`}
      ></div>
    </div>
  );
};


// --- TELAS ---

// PARTE 1: Tela de Detalhes do Filme com Lista de Atores (Mínimo 5 atores + 1 imagem principal = 6 imagens)
const MovieScreen = ({ onActorSelect }) => (
  <div className="pb-28 animate-fade-in">
    {/* Imagem Principal */}
    <div className="w-full h-56 bg-gray-200 rounded-b-3xl overflow-hidden relative shadow-md">
      <img src={movieData.mainImage} alt={movieData.title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>
      <h1 className="absolute bottom-4 left-4 text-3xl font-bold text-white drop-shadow-md">{movieData.title}</h1>
    </div>

    <div className="px-4 mt-4">
      {/* Descrição */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-4">
        <p className="text-sm text-gray-700 leading-relaxed text-justify">
          {movieData.description}
        </p>
      </div>

      {/* Stats Card */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-col gap-2">
        <div className="flex items-center text-sm text-gray-600"><DollarSign size={16} className="mr-2 text-pink-600" /> <span className="font-semibold mr-1">Orçamento:</span> {movieData.budget}</div>
        <div className="flex items-center text-sm text-gray-600"><Star size={16} className="mr-2 text-yellow-500" /> <span className="font-semibold mr-1">Voto:</span> {movieData.rating}</div>
        <div className="flex items-center text-sm text-gray-600"><Clock size={16} className="mr-2 text-pink-600" /> <span className="font-semibold mr-1">Duração:</span> {movieData.duration}</div>
        <div className="flex items-center text-sm text-gray-600"><Calendar size={16} className="mr-2 text-pink-600" /> <span className="font-semibold mr-1">Lançamento:</span> {movieData.release}</div>
      </div>

      <h2 className="text-xl font-bold text-gray-800 mb-4 px-1">Atores</h2>

      {/* Lista de Atores (5 Itens) */}
      <div className="flex flex-col gap-3">
        {movieData.actors.map((actor) => (
          <div 
            key={actor.id} 
            onClick={() => onActorSelect(actor)}
            className="flex items-center bg-white p-3 rounded-2xl shadow-sm border border-gray-100 active:bg-gray-50 transition-colors cursor-pointer"
          >
            <img src={actor.image} alt={actor.name} className="w-14 h-14 rounded-full object-cover border-2 border-gray-100 shadow-sm" />
            <div className="ml-4 flex-1">
              <h3 className="text-base font-semibold text-gray-800">{actor.role}</h3>
              <p className="text-sm text-gray-500">{actor.name}</p>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

// PARTE 2: Tela de Detalhes do Ator (Interação, Descrições > 30 palavras)
const ActorDetailScreen = ({ actor, onBack }) => (
  <div className="pb-28 animate-fade-in bg-gray-50 min-h-full">
    {/* App Bar Interna */}
    <div className="bg-white px-4 py-4 flex items-center shadow-sm sticky top-0 z-10">
      <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors">
        <ChevronLeft size={24} className="text-gray-800" />
      </button>
      <h2 className="text-lg font-bold text-gray-800 ml-2">Ator</h2>
    </div>

    <div className="px-4 mt-4">
      {/* Imagem e Descrição */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4">
        <div className="w-full h-72 bg-gray-200">
          <img src={actor.image} alt={actor.name} className="w-full h-full object-cover object-top" />
        </div>
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{actor.name}</h1>
          {/* Descrição Longa (Mínimo 30 palavras) */}
          <p className="text-sm text-gray-600 leading-relaxed text-justify">
            {actor.description}
          </p>
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-col gap-3">
        <div className="flex items-start text-sm text-gray-700">
          <User size={16} className="mr-3 mt-0.5 text-pink-600 shrink-0" /> 
          <div><span className="font-semibold block text-gray-900">Sexo</span> {actor.gender}</div>
        </div>
        <div className="flex items-start text-sm text-gray-700">
          <Calendar size={16} className="mr-3 mt-0.5 text-pink-600 shrink-0" /> 
          <div><span className="font-semibold block text-gray-900">Data de Nascimento</span> {actor.birthdate}</div>
        </div>
        <div className="flex items-start text-sm text-gray-700">
          <MapPin size={16} className="mr-3 mt-0.5 text-pink-600 shrink-0" /> 
          <div><span className="font-semibold block text-gray-900">Lugar de Nascimento</span> {actor.birthplace}</div>
        </div>
      </div>

      {/* Lista Secundária */}
      <h2 className="text-sm font-bold text-red-600 uppercase tracking-wider mb-3 text-center">Filmes Conhecidos</h2>
      <div className="flex flex-col gap-3">
        {actor.movies.map((movie, index) => (
          <div key={index} className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                <Film size={20} />
              </div>
              <span className="font-medium text-gray-800">{movie}</span>
            </div>
            <ChevronRight size={18} className="text-gray-300" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

// PARTE 3: Formulário Completo com Recursos Específicos
const FormScreen = () => {
  const [modal, setModal] = useState({ isOpen: false, title: '', message: '', isError: false });
  
  // Estados do Formulário
  const [formData, setFormData] = useState({
    titulo: '',      // Text Input 1
    diretor: '',     // Text Input 2
    estudio: '',     // Text Input 3
    origem: '',      // Text Input 4
    genero: 'Comédia',  // Picker 1
    classificacao: '12 Anos', // Picker 2
    duracao: 112,    // Slider 1
    avaliacao: 7.5,  // Slider 2
    em3d: false,     // Switch 1
    streaming: true  // Switch 2
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!formData.titulo || !formData.diretor) {
      setModal({ isOpen: true, title: 'Erro de Validação', message: 'Por favor, preencha pelo menos o Título e o Diretor do filme.', isError: true });
      return;
    }
    setModal({ isOpen: true, title: 'Sucesso', message: `O filme "${formData.titulo}" foi cadastrado com sucesso no sistema!`, isError: false });
  };

  const handleClear = () => {
    setFormData({
      titulo: '', diretor: '', estudio: '', origem: '',
      genero: 'Comédia', classificacao: '12 Anos',
      duracao: 112, avaliacao: 7.5,
      em3d: false, streaming: true
    });
    setModal({ isOpen: true, title: 'Limpo', message: 'O formulário foi redefinido.', isError: false });
  };

  return (
    <div className="p-4 pb-24 animate-fade-in bg-gray-50 min-h-full">
      <CustomModal 
        isOpen={modal.isOpen} 
        onClose={() => setModal({ ...modal, isOpen: false })}
        title={modal.title}
        message={modal.message}
        isError={modal.isError}
      />

      <div className="mb-6 text-center mt-2">
        <h1 className="text-2xl font-bold text-gray-800">Novo Cadastro</h1>
        <p className="text-sm text-gray-500 mt-1">Preencha as informações da obra</p>
      </div>

      <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-5">
        
        {/* 4 Inputs de Texto */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1 ml-1 uppercase tracking-wide">Título do Filme</label>
            <input 
              type="text" 
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
              placeholder="Ex: Barbie"
              value={formData.titulo} onChange={(e) => handleInputChange('titulo', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1 ml-1 uppercase tracking-wide">Diretor(a)</label>
            <input 
              type="text" 
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
              placeholder="Ex: Greta Gerwig"
              value={formData.diretor} onChange={(e) => handleInputChange('diretor', e.target.value)}
            />
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-600 mb-1 ml-1 uppercase tracking-wide">Estúdio</label>
              <input 
                type="text" 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                placeholder="Ex: Warner Bros"
                value={formData.estudio} onChange={(e) => handleInputChange('estudio', e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-600 mb-1 ml-1 uppercase tracking-wide">País de Origem</label>
              <input 
                type="text" 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                placeholder="Ex: EUA"
                value={formData.origem} onChange={(e) => handleInputChange('origem', e.target.value)}
              />
            </div>
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* 2 Estruturas de Picker (Selects) */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-xs font-semibold text-gray-600 mb-1 ml-1 uppercase tracking-wide">Gênero</label>
            <div className="relative">
              <select 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-pink-500 cursor-pointer"
                value={formData.genero} onChange={(e) => handleInputChange('genero', e.target.value)}
              >
                <option>Comédia</option><option>Ação</option><option>Ficção Científica</option><option>Drama</option>
              </select>
              <ChevronRight size={16} className="absolute right-3 top-3.5 text-gray-400 rotate-90 pointer-events-none" />
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-xs font-semibold text-gray-600 mb-1 ml-1 uppercase tracking-wide">Classificação</label>
            <div className="relative">
              <select 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-pink-500 cursor-pointer"
                value={formData.classificacao} onChange={(e) => handleInputChange('classificacao', e.target.value)}
              >
                <option>12 Anos</option><option>Livre</option><option>10 Anos</option><option>14 Anos</option><option>16 Anos</option><option>18 Anos</option>
              </select>
              <ChevronRight size={16} className="absolute right-3 top-3.5 text-gray-400 rotate-90 pointer-events-none" />
            </div>
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* 2 Estruturas de Slider */}
        <div className="space-y-5">
          <div>
            <div className="flex justify-between items-end mb-2 ml-1">
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide">Duração (Minutos)</label>
              <span className="text-sm font-bold text-pink-600">{formData.duracao} min</span>
            </div>
            <input 
              type="range" min="30" max="240" 
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-600"
              value={formData.duracao} onChange={(e) => handleInputChange('duracao', e.target.value)}
            />
          </div>
          <div>
             <div className="flex justify-between items-end mb-2 ml-1">
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide">Expectativa / Nota</label>
              <span className="text-sm font-bold text-yellow-500">{formData.avaliacao} ★</span>
            </div>
            <input 
              type="range" min="0" max="10" step="0.5"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-yellow-500"
              value={formData.avaliacao} onChange={(e) => handleInputChange('avaliacao', e.target.value)}
            />
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* 2 Estruturas de Switch */}
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-xl border border-gray-100">
            <span className="text-sm font-medium text-gray-700">Lançamento em 3D</span>
            <Switch isOn={formData.em3d} handleToggle={() => handleInputChange('em3d', !formData.em3d)} />
          </div>
          <div className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-xl border border-gray-100">
            <span className="text-sm font-medium text-gray-700">Disponível em Streaming</span>
            <Switch isOn={formData.streaming} handleToggle={() => handleInputChange('streaming', !formData.streaming)} />
          </div>
        </div>

        {/* 2 Botões com Interação */}
        <div className="flex gap-3 mt-2">
          <button 
            onClick={handleClear}
            className="flex-1 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors active:scale-95"
          >
            Limpar
          </button>
          <button 
            onClick={handleSave}
            className="flex-2 py-3.5 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-xl shadow-md shadow-pink-200 transition-all active:scale-95"
          >
            Salvar Dados
          </button>
        </div>

      </div>
    </div>
  );
};


// --- COMPONENTE PRINCIPAL (Wrapper simulando celular) ---
export default function App() {
  const [activeTab, setActiveTab] = useState('list'); // 'list' ou 'form'
  const [selectedActor, setSelectedActor] = useState(null);

  // Efeitos globais de estilo
  React.useEffect(() => {
    document.body.style.backgroundColor = '#e5e7eb'; // bg-gray-200
    document.body.style.display = 'flex';
    document.body.style.justifyContent = 'center';
    document.body.style.alignItems = 'center';
    document.body.style.minHeight = '100vh';
    document.body.style.margin = '0';
  }, []);

  return (
    // Simulador de dispositivo móvel
    <div className="w-full max-w-100 h-212.5 max-h-screen bg-white shadow-2xl sm:rounded-[2.5rem] relative overflow-hidden flex flex-col border-8 border-gray-900">
      
      {/* Notch (Detalhe estético) */}
      <div className="absolute top-0 inset-x-0 h-6 bg-gray-900 rounded-b-3xl w-40 mx-auto z-50"></div>

      {/* Conteúdo Rolável Principal */}
      <div className="flex-1 overflow-y-auto bg-gray-100 scrollbar-hide pt-2">
        {activeTab === 'list' ? (
          selectedActor ? (
             <ActorDetailScreen actor={selectedActor} onBack={() => setSelectedActor(null)} />
          ) : (
             <MovieScreen onActorSelect={(actor) => setSelectedActor(actor)} />
          )
        ) : (
          <FormScreen />
        )}
      </div>

      {/* Barra de Navegação Inferior (Bottom Tab Bar) */}
      <div className="bg-white border-t border-gray-200 flex justify-around items-center pb-6 pt-3 px-2 z-20 absolute bottom-0 w-full">
        <button 
          onClick={() => { setActiveTab('list'); setSelectedActor(null); }}
          className={`flex flex-col items-center flex-1 py-1 transition-colors ${activeTab === 'list' && !selectedActor ? 'text-pink-600' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <Film size={24} className={activeTab === 'list' && !selectedActor ? 'fill-pink-100' : ''} />
          <span className="text-[10px] mt-1 font-medium">Filme</span>
        </button>
        
        <button 
          onClick={() => setActiveTab('form')}
          className={`flex flex-col items-center flex-1 py-1 transition-colors ${activeTab === 'form' ? 'text-pink-600' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <PlusSquare size={24} className={activeTab === 'form' ? 'fill-pink-100' : ''} />
          <span className="text-[10px] mt-1 font-medium">Cadastrar</span>
        </button>
      </div>

      {/* Estilos injetados para esconder scrollbar em navegadores web e animacoes */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}