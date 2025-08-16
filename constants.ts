
import type { MoodData, Feeling, Insight, Article, Professional, User, PodcastCategory, PodcastItem, ResourceItem, ActivityItem, FeedPost, DailyNutrition, Macro, Meal, Notification, ChatConversation, ProgressChartData, Goal, Achievement, Story, StoryHighlight, RelatedUser, Step, GroupClass, DailyWater, WaterDataPoint, CalorieDataPoint, Comment, AchievementCategory } from './types';
import { ArticleIcon } from './components/icons/ArticleIcon';
import { TipIcon } from './components/icons/TipIcon';
import { PlayIcon } from './components/icons/PlayIcon';
import { BookOpenIcon } from './components/icons/BookOpenIcon';
import { FireIcon } from './components/icons/FireIcon';
import { SparklesIcon } from './components/icons/SparklesIcon';
import { TrophyIcon } from './components/icons/TrophyIcon';
import { LightBulbIcon } from './components/icons/LightBulbIcon';
import { SmoothieIcon } from './components/icons/SmoothieIcon';
import { ChickenLegIcon } from './components/icons/ChickenLegIcon';
import { SaladIcon } from './components/icons/SaladIcon';
import { EggIcon } from './components/icons/EggIcon';
import { MicrophoneIcon } from './components/icons/MicrophoneIcon';


export const weeklyMoodData: MoodData[] = [
  { day: 'Seg', value: 60 },
  { day: 'Ter', value: 55 },
  { day: 'Qua', value: 65 },
  { day: 'Qui', value: 60 },
  { day: 'Sex', value: 50 },
  { day: 'Sáb', value: 80 },
  { day: 'Dom', value: 75 },
];

export const feelings: Feeling[] = [
  { name: 'Feliz', emoji: '😄' },
  { name: 'Calmo', emoji: '😌' },
  { name: 'Triste', 'emoji': '😞' },
  { name: 'Irritado', emoji: '😠' },
  { name: 'Ansioso', emoji: '😟' },
];

export const insightsData: Insight[] = [
  {
    title: 'Distorções Cognitivas',
    value: 80,
    label: 'Catastrofização',
    color: '#f472b6', // pink-400
  },
  {
    title: 'Estilos de Apego',
    value: 45,
    label: 'Ansioso-Preocupado',
    color: '#60a5fa', // blue-400
  },
];

export const articles: Article[] = [
    {
        id: 'entendendo-a-ansiedade',
        type: 'ARTICLE',
        title: 'Entendendo a Ansiedade',
        description: 'Causas, sintomas e estratégias eficazes.',
        Icon: ArticleIcon,
        imageUrl: 'https://images.unsplash.com/photo-1594122230689-45899d9e6f69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOTAwNXwwfDF8c2VhcmNofDEzfHxzdHJlc3MlMjByZWxpZWZ8ZW58MHx8fHwxNzE5OTM5NTkyfDA&ixlib=rb-4.0.3&q=80&w=400',
        content: `A ansiedade é uma resposta natural do corpo ao estresse. É um sentimento de medo ou apreensão sobre o que está por vir. O primeiro dia de aula, uma entrevista de emprego ou um discurso podem causar ansiedade em muitas pessoas. Mas se os seus sentimentos de ansiedade são extremos, duram mais de seis meses e estão interferindo na sua vida, você pode ter um transtorno de ansiedade.\n\nSintomas Comuns:\n- Sentimento de nervosismo, agitação ou tensão.\n- Ter uma sensação de perigo iminente, pânico ou desgraça.\n- Ter um aumento da frequência cardíaca.\n- Respirar rapidamente (hiperventilação).\n\nEstratégias de Gerenciamento:\n1. Técnicas de Relaxamento: Práticas como meditação, mindfulness e respiração profunda podem ajudar a acalmar a mente.\n2. Exercício Físico: A atividade física regular é uma ótima maneira de aliviar o estresse e melhorar o humor.\n3. Terapia: A Terapia Cognitivo-Comportamental (TCC) é particularmente eficaz para transtornos de ansiedade.`,
        tags: ['Saúde Mental', 'Ansiedade']
    },
    {
        id: 'meditacao-mindfulness',
        type: 'TIP',
        title: 'Meditação Mindfulness de 5 Minutos',
        description: 'Reduza o estresse e melhore o foco com 5 min.',
        Icon: TipIcon,
        imageUrl: 'https://images.unsplash.com/photo-1506126613408-4e63a5f4bd40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOTAwNXwwfDF8c2VhcmNofDR8fG1lZGl0YXRpb258ZW58MHx8fHwxNzE5OTM5NjM4fDA&ixlib=rb-4.0.3&q=80&w=400',
        content: `A meditação mindfulness é uma prática que pode ser feita em qualquer lugar. Esta técnica rápida de 5 minutos pode ajudar a recentralizar sua mente e reduzir o estresse.\n\nPasso 1: Encontre um lugar tranquilo.\nSente-se em uma posição confortável, com a coluna ereta, mas não rígida. Você pode sentar em uma cadeira com os pés no chão ou de pernas cruzadas no chão.\n\nPasso 2: Feche os olhos e respire.\nComece prestando atenção à sua respiração. Sinta o ar entrando e saindo do seu corpo. Não tente mudar a forma como você respira; apenas observe.\n\nPasso 3: Observe seus pensamentos.\nSua mente irá divagar. Isso é normal. Quando perceber que seus pensamentos se desviaram, reconheça-os gentilmente, sem julgamento, e traga seu foco de volta à sua respiração.\n\nPasso 4: Sinta seu corpo.\nPercorra mentalmente seu corpo, dos pés à cabeça. Note quaisquer sensações — calor, frio, formigamento, tensão — sem julgá-las.\n\nPasso 5: Termine com gentileza.\nQuando os 5 minutos terminarem, traga lentamente sua atenção de volta ao ambiente ao seu redor. Abra os olhos. Observe como você se sente agora.`,
        tags: ['Mindfulness', 'Estresse']
    },
    {
        id: 'poder-das-proteinas',
        type: 'TIP',
        title: 'O Poder das Proteínas',
        description: 'Por que a proteína é essencial para seus músculos.',
        Icon: TipIcon,
        imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
        content: `As proteínas são os blocos de construção do nosso corpo, essenciais para a reparação e o crescimento muscular, especialmente após o exercício. Incluir fontes de proteína em todas as refeições ajuda a manter a massa muscular, promove a saciedade (ajudando no controle de peso) e apoia um metabolismo saudável.\n\nBoas fontes de proteína incluem:\n- Carnes magras (frango, peru)\n- Peixes (salmão, atum)\n- Ovos\n- Laticínios (iogurte grego, cottage)\n- Leguminosas (feijão, lentilha, grão de bico)\n- Tofu e tempeh\n- Oleaginosas e sementes\n\nCertifique-se de variar suas fontes de proteína para obter um espectro completo de aminoácidos e nutrientes.`,
        tags: ['Nutrição', 'Proteína']
    },
    {
        id: 'hidratacao-essencial',
        type: 'TIP',
        title: 'Hidratação é Chave',
        description: 'Beba água, seu corpo agradece.',
        Icon: TipIcon,
        imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
        content: `Manter-se hidratado é uma das coisas mais simples e eficazes que você pode fazer pela sua saúde. A água é crucial para quase todas as funções do corpo, incluindo:\n\n- Regulação da temperatura corporal\n- Transporte de nutrientes e oxigênio\n- Eliminação de toxinas\n- Lubrificação das articulações\n- Melhora da função cerebral e dos níveis de energia\n\nUma boa regra geral é beber pelo menos 2 litros de água por dia, mas essa quantidade pode variar dependendo do seu nível de atividade física, clima e saúde geral. Não espere sentir sede para beber água – a sede já é um sinal de desidratação.`,
        tags: ['Hidratação', 'Saúde']
    },
    {
        id: 'curiosity-water-brain',
        type: 'CURIOSITY',
        title: 'Seu Cérebro é 75% Água',
        description: 'A desidratação leve pode afetar seu humor e concentração.',
        Icon: LightBulbIcon,
        imageUrl: 'https://images.unsplash.com/photo-1550523293-8f5103125695?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
        content: 'Cerca de 75% do cérebro é composto por água. Isso significa que a hidratação adequada é fundamental para manter a função cerebral em seu pico. Mesmo uma leve desidratação de 1-2% pode prejudicar o desempenho cognitivo, incluindo atenção, memória e humor. Portanto, beber água ao longo do dia não é apenas para o corpo, mas também essencial para uma mente afiada.',
        tags: ['Hidratação', 'Cérebro']
    },
    {
        id: 'curiosity-banana-berry',
        type: 'CURIOSITY',
        title: 'Bananas São Bagas, Morangos Não',
        description: 'Uma reviravolta na classificação botânica das frutas.',
        Icon: LightBulbIcon,
        imageUrl: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
        content: 'Botanicamente falando, uma baga é uma fruta carnuda produzida a partir de um único ovário. As bananas se encaixam nessa definição, assim como uvas, tomates e abacates. No entanto, morangos e framboesas são "frutos agregados", pois se desenvolvem a partir de uma flor com muitos ovários. É uma peculiaridade divertida do mundo das plantas!',
        tags: ['Mitos', 'Botânica']
    },
    {
        id: 'curiosity-gut-brain',
        type: 'CURIOSITY',
        title: 'Seu Intestino é seu "Segundo Cérebro"',
        description: 'A conexão intestino-cérebro afeta seu humor e saúde.',
        Icon: LightBulbIcon,
        imageUrl: 'https://images.unsplash.com/photo-1587671921999-65b89153573c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
        content: 'O intestino contém milhões de neurônios - tantos que é frequentemente chamado de "segundo cérebro". Ele se comunica diretamente com o cérebro através do eixo intestino-cérebro. É por isso que uma dieta saudável rica em probióticos e fibras pode não apenas melhorar a digestão, mas também impactar positivamente o humor e reduzir o risco de ansiedade e depressão.',
        tags: ['Digestão', 'Cérebro', 'Saúde Mental']
    },
    {
        id: 'curiosity-sleep-hunger',
        type: 'CURIOSITY',
        title: 'Dormir Mal Aumenta a Fome',
        description: 'A falta de sono mexe com os hormônios da fome.',
        Icon: LightBulbIcon,
        imageUrl: 'https://images.unsplash.com/photo-1590483786737-2ea84b574187?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
        content: 'A privação do sono desregula dois hormônios chave do apetite: a grelina (que estimula a fome) e a leptina (que sinaliza saciedade). A falta de sono aumenta os níveis de grelina e diminui os de leptina, fazendo você se sentir mais faminto e propenso a desejar alimentos ricos em calorias e carboidratos. Priorizar o sono é uma estratégia poderosa para o controle de peso.',
        tags: ['Sono', 'Metabolismo']
    },
    {
        id: 'curiosity-vitamin-d',
        type: 'CURIOSITY',
        title: 'Vitamina D, o "Hormônio do Sol"',
        description: 'Essencial para a imunidade e muito mais.',
        Icon: LightBulbIcon,
        imageUrl: 'https://images.unsplash.com/photo-1628339558913-2b5a5b451e22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
        content: 'Embora a chamemos de vitamina, a Vitamina D funciona mais como um hormônio no corpo, regulando centenas de genes. É crucial para a absorção de cálcio (saúde óssea) e para o funcionamento do sistema imunológico. A principal fonte é a exposição solar, mas também pode ser encontrada em peixes gordurosos e alimentos fortificados.',
        tags: ['Vitaminas', 'Imunidade']
    },
    {
        id: 'curiosity-muscle-metabolism',
        type: 'CURIOSITY',
        title: 'Músculos Queimam Mais Calorias',
        description: 'Mais massa muscular significa um metabolismo mais rápido.',
        Icon: LightBulbIcon,
        imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
        content: 'O tecido muscular é metabolicamente mais ativo do que o tecido adiposo. Isso significa que quanto mais massa muscular você tiver, mais calorias seu corpo queima em repouso. O treinamento de força é fundamental não apenas para a estética, mas também para manter um metabolismo saudável ao longo da vida.',
        tags: ['Metabolismo', 'Performance']
    },
    {
        id: 'curiosity-colorful-plate',
        type: 'CURIOSITY',
        title: 'Coma um "Arco-Íris" de Cores',
        description: 'Diferentes cores de vegetais oferecem diferentes benefícios.',
        Icon: LightBulbIcon,
        imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
        content: 'As cores vibrantes em frutas e vegetais vêm de fitoquímicos, compostos que têm propriedades antioxidantes e anti-inflamatórias. Vermelhos (licopeno), laranjas/amarelos (carotenoides), verdes (clorofila) e roxos/azuis (antocianinas) oferecem benefícios únicos. Montar um prato colorido garante uma ampla gama de nutrientes para proteger sua saúde.',
        tags: ['Vitaminas', 'Antioxidantes', 'Saúde']
    },
    {
        id: 'curiosity-coffee-performance',
        type: 'CURIOSITY',
        title: 'Café Melhora o Desempenho Físico',
        description: 'A cafeína é um dos auxílios ergogênicos mais eficazes.',
        Icon: LightBulbIcon,
        imageUrl: 'https://images.unsplash.com/photo-1511920183353-3c9c9b0a727c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
        content: 'A cafeína, encontrada no café, é um estimulante comprovado que pode melhorar o desempenho atlético. Ela funciona bloqueando os receptores de adenosina no cérebro, reduzindo a percepção de fadiga e dor. Uma xícara de café cerca de 30-60 minutos antes do treino pode aumentar a resistência, força e potência.',
        tags: ['Performance', 'Estimulantes']
    },
    {
        id: 'curiosity-honey-never-spoils',
        type: 'CURIOSITY',
        title: 'O Mel Nunca Estraga',
        description: 'Um alimento natural com prazo de validade eterno.',
        Icon: LightBulbIcon,
        imageUrl: 'https://images.unsplash.com/photo-1558642159-0065a443924a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
        content: 'Devido à sua baixa umidade e alta acidez, o mel é um dos poucos alimentos que nunca estraga. Arqueólogos encontraram potes de mel em tumbas egípcias com milhares de anos que ainda estavam perfeitamente comestíveis. Suas propriedades antibacterianas naturais o tornam um alimento incrivelmente estável.',
        tags: ['Mitos', 'Alimentos']
    },
    {
        id: 'curiosity-spicy-metabolism',
        type: 'CURIOSITY',
        title: 'Pimenta Acelera o Metabolismo (um Pouco)',
        description: 'A capsaicina pode dar um pequeno impulso ao seu metabolismo.',
        Icon: LightBulbIcon,
        imageUrl: 'https://images.unsplash.com/photo-1598463223946-4b84570c25a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
        content: 'A capsaicina, o composto que dá às pimentas seu calor, pode aumentar temporariamente o metabolismo em cerca de 5-8%. Embora o efeito seja modesto e não seja uma solução mágica para perda de peso, incluir alimentos picantes em uma dieta equilibrada pode contribuir para um maior gasto calórico ao longo do tempo.',
        tags: ['Metabolismo', 'Alimentos']
    },
];

export const activityItems: ActivityItem[] = [
    {
        id: 'cardio-iniciante-cond',
        category: 'workout',
        title: 'Cardio Leve',
        description: 'Comece o dia com um treino leve para aquecer.',
        duration: '20 min',
        Icon: FireIcon,
        bgColor: 'bg-orange-100',
        textColor: 'text-orange-500',
        videoUrl: 'https://www.youtube.com/embed/g_tea8ZN-ZE',
        imageUrl: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
        content: '',
        difficulty: 'Iniciante',
        goal: 'Condicionamento',
        muscleGroup: 'Corpo Todo',
        steps: [
            { type: 'exercise', name: 'Corrida no Lugar (Aquecimento)', details: '5 minutos' },
            { type: 'exercise', name: 'Polichinelos', details: '3x 30 segundos' },
            { type: 'rest', name: 'Descanso', details: '15 segundos' },
            { type: 'exercise', name: 'Elevação de Joelhos', details: '3x 30 segundos' },
            { type: 'rest', name: 'Descanso', details: '15 segundos' },
            { type: 'exercise', name: 'Agachamento Livre (sem peso)', details: '3x 15 repetições' },
            { type: 'rest', name: 'Descanso', details: '30 segundos' },
            { type: 'exercise', name: 'Caminhada Leve (Desaquecimento)', details: '5 minutos' },
        ]
    },
    {
        id: 'hiper-medio-peito',
        category: 'workout',
        title: 'Força no Peitoral',
        description: 'Treino de peito focado em desenvolvimento muscular.',
        duration: '45 min',
        Icon: FireIcon,
        bgColor: 'bg-red-100',
        textColor: 'text-red-500',
        videoUrl: 'https://www.youtube.com/embed/g_tea8ZN-ZE',
        imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
        content: '',
        difficulty: 'Médio',
        goal: 'Hipertrofia',
        muscleGroup: 'Peito',
        steps: [
            { type: 'exercise', name: 'Supino Reto com Barra', details: '4x 8-10 repetições' },
            { type: 'rest', name: 'Descanso', details: '60-90 segundos' },
            { type: 'exercise', name: 'Supino Inclinado com Halteres', details: '3x 10-12 repetições' },
            { type: 'rest', name: 'Descanso', details: '60 segundos' },
            { type: 'exercise', name: 'Crucifixo com Halteres', details: '3x 12-15 repetições' },
            { type: 'rest', name: 'Descanso', details: '45 segundos' },
            { type: 'exercise', name: 'Flexões', details: '3x até a falha' },
        ]
    },
    {
        id: 'emag-dificil-hiit',
        category: 'workout',
        title: 'HIIT Queima Total',
        description: 'Treino intervalado de alta intensidade para máxima queima.',
        duration: '25 min',
        Icon: FireIcon,
        bgColor: 'bg-yellow-100',
        textColor: 'text-yellow-500',
        videoUrl: 'https://www.youtube.com/embed/g_tea8ZN-ZE',
        imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
        content: '',
        difficulty: 'Difícil',
        goal: 'Emagrecimento',
        muscleGroup: 'Corpo Todo',
        steps: [
            { type: 'exercise', name: 'Burpees', details: '45 segundos de exercício' },
            { type: 'rest', name: 'Descanso', details: '15 segundos' },
            { type: 'exercise', name: 'Agachamento com Salto', details: '45 segundos de exercício' },
            { type: 'rest', name: 'Descanso', details: '15 segundos' },
            { type: 'exercise', name: 'Alpinista (Mountain Climbers)', details: '45 segundos de exercício' },
            { type: 'rest', name: 'Descanso', details: '15 segundos' },
            { type: 'exercise', name: 'Prancha com Toque no Ombro', details: '45 segundos de exercício' },
            { type: 'rest', name: 'Descanso de Circuito', details: '60 segundos. Repita tudo mais 3 vezes.' },
        ]
    },
    {
        id: 'hiper-iniciante-costas',
        category: 'workout',
        title: 'Costas para Iniciantes',
        description: 'Construa uma base sólida para suas costas.',
        duration: '30 min',
        Icon: FireIcon,
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-500',
        videoUrl: 'https://www.youtube.com/embed/g_tea8ZN-ZE',
        imageUrl: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
        content: '',
        difficulty: 'Iniciante',
        goal: 'Hipertrofia',
        muscleGroup: 'Costas',
        steps: [
            { type: 'exercise', name: 'Remada Curvada com Halteres', details: '3x 12 repetições' },
            { type: 'rest', name: 'Descanso', details: '45-60 segundos' },
            { type: 'exercise', name: 'Puxada Alta (Máquina ou Elástico)', details: '3x 12 repetições' },
            { type: 'rest', name: 'Descanso', details: '45-60 segundos' },
            { type: 'exercise', name: 'Remada Serrote com Halter', details: '3x 10 repetições (cada lado)' },
            { type: 'rest', name: 'Descanso', details: '45-60 segundos' },
        ]
    },
    {
        id: 'cond-medio-funcional',
        category: 'workout',
        title: 'Treino Funcional',
        description: 'Melhore sua força e coordenação para o dia a dia.',
        duration: '40 min',
        Icon: FireIcon,
        bgColor: 'bg-teal-100',
        textColor: 'text-teal-500',
        videoUrl: 'https://www.youtube.com/embed/g_tea8ZN-ZE',
        imageUrl: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
        content: '',
        difficulty: 'Médio',
        goal: 'Condicionamento',
        muscleGroup: 'Corpo Todo',
        steps: [
            { type: 'exercise', name: 'Agachamento Goblet', details: '3x 15 repetições' },
            { type: 'rest', name: 'Descanso', details: '30 segundos' },
            { type: 'exercise', name: 'Afundo com Passada', details: '3x 10 repetições (cada perna)' },
            { type: 'rest', name: 'Descanso', details: '30 segundos' },
            { type: 'exercise', name: 'Flexão de Braço', details: '3x 10-12 repetições' },
            { type: 'rest', name: 'Descanso', details: '30 segundos' },
            { type: 'exercise', name: 'Prancha Abdominal', details: '3x 45 segundos' },
        ]
    },
    {
        id: 'emag-iniciante-caminhada',
        category: 'workout',
        title: 'Power Caminhada',
        description: 'Uma caminhada energizada com variações.',
        duration: '35 min',
        Icon: FireIcon,
        bgColor: 'bg-green-100',
        textColor: 'text-green-500',
        videoUrl: 'https://www.youtube.com/embed/g_tea8ZN-ZE',
        imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
        content: '',
        difficulty: 'Iniciante',
        goal: 'Emagrecimento',
        muscleGroup: 'Pernas',
        steps: [
            { type: 'exercise', name: 'Caminhada Leve (Aquecimento)', details: '5 minutos' },
            { type: 'exercise', name: 'Acelerar o Passo (Ritmo Moderado)', details: '10 minutos' },
            { type: 'exercise', name: 'Tiros de Caminhada Rápida', details: '5x (1 min rápido, 1 min lento)' },
            { type: 'exercise', name: 'Ritmo Moderado', details: '5 minutos' },
            { type: 'exercise', name: 'Caminhada Leve (Desaquecimento)', details: '5 minutos' },
        ]
    },
     {
        id: 'hiper-dificil-pernas',
        category: 'workout',
        title: 'Pernas Avançado',
        description: 'Agachamentos e levantamento terra para volume máximo.',
        duration: '60 min',
        Icon: FireIcon,
        bgColor: 'bg-purple-100',
        textColor: 'text-purple-500',
        videoUrl: 'https://www.youtube.com/embed/g_tea8ZN-ZE',
        imageUrl: 'https://images.unsplash.com/photo-1584735935682-2f2b62d0a520?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
        content: '',
        difficulty: 'Difícil',
        goal: 'Hipertrofia',
        muscleGroup: 'Pernas e Glúteos',
        steps: [
            { type: 'exercise', name: 'Agachamento Livre com Barra', details: '4x 6-8 repetições' },
            { type: 'rest', name: 'Descanso', details: '90-120 segundos' },
            { type: 'exercise', name: 'Leg Press 45°', details: '4x 8-10 repetições' },
            { type: 'rest', name: 'Descanso', details: '90 segundos' },
            { type: 'exercise', name: 'Levantamento Terra Romeno', details: '3x 10 repetições' },
            { type: 'rest', name: 'Descanso', details: '60 segundos' },
            { type: 'exercise', name: 'Cadeira Extensora', details: '3x 12-15 repetições' },
        ]
    },
    {
        id: 'foco-e-clareza',
        category: 'meditation',
        title: 'Foco e Clareza',
        description: 'Meditação para melhorar a concentração.',
        duration: '10 min',
        Icon: SparklesIcon,
        bgColor: 'bg-purple-100',
        textColor: 'text-purple-500',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        content: `Esta meditação guiada de 10 minutos ajuda a treinar sua atenção e a cultivar um estado de clareza mental.\n\nInstruções:\n1. Encontre uma posição sentada confortável.\n2. Feche os olhos suavemente e comece a seguir o som da minha voz.\n3. Traga sua atenção para a sua respiração, o ponto de âncora para sua mente.\n4. Sempre que um pensamento surgir, simplesmente reconheça-o e retorne suavemente sua atenção à respiração.\n5. Permaneça neste estado de observação calma pelo tempo da meditação.`
    },
    {
        id: 'receita-smoothie-verde',
        category: 'nutrition',
        title: 'Smoothie Verde Detox',
        description: 'Energia e nutrientes em um copo.',
        duration: '5 min',
        Icon: SmoothieIcon,
        bgColor: 'bg-green-100',
        textColor: 'text-green-500',
        imageUrl: 'https://images.unsplash.com/photo-1578351574193-35a14a5a1f6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
        videoUrl: 'https://www.youtube.com/embed/g_tea8ZN-ZE',
        content: `Este smoothie é uma maneira fantástica de ingerir uma grande quantidade de vitaminas e minerais logo pela manhã. A combinação de espinafre, frutas e gorduras saudáveis do abacate e da chia promove saciedade e energia duradoura.

**Ingredientes:**
- 1 xícara de espinafre fresco
- 1/2 banana congelada para cremosidade
- 1/2 maçã verde, com casca
- 1/4 de abacate
- 1 colher de sopa de sementes de chia
- 1 xícara de água de coco ou leite de amêndoas sem açúcar

**Modo de Preparo:**
1. Adicione todos os ingredientes no liquidificador, começando com os líquidos para facilitar o processo.
2. Bata em alta velocidade por cerca de 1-2 minutos, ou até que a mistura esteja completamente lisa e cremosa.
3. Se o smoothie estiver muito grosso, adicione um pouco mais de líquido até atingir a consistência desejada.
4. Sirva imediatamente e aproveite essa bomba de nutrientes!

**Informações Nutricionais (Aproximadas):**
- Calorias: 280 kcal
- Proteínas: 5g
- Carboidratos: 35g
- Gorduras: 15g
- Fibras: 12g`,
        goal: 'Emagrecimento',
        difficulty: 'Iniciante',
    },
    {
        id: 'receita-frango-batata',
        category: 'nutrition',
        title: 'Frango Grelhado com Batata Doce',
        description: 'A combinação perfeita para hipertrofia.',
        duration: '30 min',
        Icon: ChickenLegIcon,
        bgColor: 'bg-red-100',
        textColor: 'text-red-500',
        imageUrl: 'https://images.unsplash.com/photo-1598515214211-89d3c7373014?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
        videoUrl: 'https://www.youtube.com/embed/g_tea8ZN-ZE',
        content: `Um prato clássico para quem busca ganho de massa muscular. A proteína magra do frango ajuda na reconstrução das fibras musculares, enquanto a batata doce fornece carboidratos de digestão lenta para energia sustentada.

**Ingredientes:**
- 150g de filé de frango
- 200g de batata doce
- 1 colher de chá de azeite de oliva extra virgem
- Sal, pimenta do reino e alecrim a gosto
- Brócolis cozido no vapor para acompanhar (opcional)

**Modo de Preparo:**
1. Tempere o filé de frango com sal, pimenta e alecrim.
2. Aqueça uma frigideira ou grill com o azeite e grelhe o frango por 6-8 minutos de cada lado, ou até estar bem cozido.
3. Enquanto o frango grelha, cozinhe a batata doce. Você pode cozinhar no vapor até ficar macia, ou cortar em rodelas e assar no forno a 200°C por cerca de 20-25 minutos.
4. Sirva o frango grelhado com a batata doce e o brócolis.

**Informações Nutricionais (Aproximadas):**
- Calorias: 450 kcal
- Proteínas: 40g
- Carboidratos: 50g
- Gorduras: 10g`,
        goal: 'Hipertrofia',
        difficulty: 'Iniciante',
    },
    {
        id: 'receita-salada-energia',
        category: 'nutrition',
        title: 'Salada Energética com Grão de Bico',
        description: 'Refeição leve para condicionamento físico.',
        duration: '15 min',
        Icon: SaladIcon,
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-500',
        imageUrl: 'https://images.unsplash.com/photo-1551248429-40974011e723?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
        videoUrl: 'https://www.youtube.com/embed/g_tea8ZN-ZE',
        content: `Esta salada é uma refeição completa, leve e rica em fibras, ideal para quem busca condicionamento físico. O grão de bico oferece proteína e carboidratos complexos, enquanto os vegetais garantem uma explosão de vitaminas e minerais.

**Ingredientes:**
- 2 xícaras de mix de folhas verdes (alface, rúcula, agrião)
- 1 xícara de grão de bico cozido
- 1/2 xícara de tomate cereja, cortado ao meio
- 1/2 pepino, em cubos
- 1/4 de cebola roxa fatiada finamente
- Molho: 2 colheres de sopa de azeite, suco de 1/2 limão, sal e pimenta

**Modo de Preparo:**
1. Em uma tigela grande, combine todos os ingredientes da salada: as folhas, o grão de bico, o tomate, o pepino e a cebola roxa.
2. Em uma tigela pequena, prepare o molho batendo o azeite, o suco de limão, o sal e a pimenta.
3. Regue a salada com o molho e misture delicadamente para cobrir todos os ingredientes.
4. Sirva imediatamente como uma refeição principal leve ou como acompanhamento.

**Informações Nutricionais (Aproximadas):**
- Calorias: 380 kcal
- Proteínas: 15g
- Carboidratos: 45g
- Gorduras: 18g`,
        goal: 'Condicionamento',
        difficulty: 'Iniciante',
    },
    {
        id: 'receita-omelete-fit',
        category: 'nutrition',
        title: 'Omelete Fit de Claras',
        description: 'Rico em proteína e baixo carboidrato.',
        duration: '10 min',
        Icon: EggIcon,
        bgColor: 'bg-yellow-100',
        textColor: 'text-yellow-500',
        imageUrl: 'https://images.unsplash.com/photo-1598214886230-67a5a5e34f61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
        videoUrl: 'https://www.youtube.com/embed/g_tea8ZN-ZE',
        content: `Uma opção rápida, prática e altamente proteica para qualquer refeição do dia, especialmente no café da manhã ou pós-treino. Ideal para dietas com foco em emagrecimento e definição muscular.

**Ingredientes:**
- 4 claras de ovo
- 1 xícara de espinafre fresco
- 50g de cogumelos fatiados
- 1/4 de tomate picado, sem sementes
- Sal e pimenta do reino a gosto
- 1 colher de chá de azeite ou óleo de coco

**Modo de Preparo:**
1. Em uma tigela, bata as claras com sal e pimenta.
2. Aqueça o azeite em uma frigideira antiaderente em fogo médio. Adicione os cogumelos e o espinafre e refogue por 2-3 minutos, até o espinafre murchar.
3. Despeje as claras batidas sobre os vegetais na frigideira.
4. Cozinhe por cerca de 3-4 minutos, ou até que as bordas comecem a firmar. Adicione o tomate picado por cima.
5. Com uma espátula, dobre a omelete ao meio e cozinhe por mais 1-2 minutos, até que o centro esteja cozido.
6. Deslize para um prato e sirva quente.

**Informações Nutricionais (Aproximadas):**
- Calorias: 150 kcal
- Proteínas: 20g
- Carboidratos: 5g
- Gorduras: 5g`,
        goal: 'Emagrecimento',
        difficulty: 'Iniciante',
    }
];

export const podcastCategories: PodcastCategory[] = [
    {
        id: 'business',
        title: 'Business',
        imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
        gradient: 'linear-gradient(to bottom right, #3b82f6, #1e40af)', // blue
    },
    {
        id: 'self-care',
        title: 'Self-Care',
        imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
        gradient: 'linear-gradient(to bottom right, #a855f7, #6b21a8)', // purple
    },
    {
        id: 'stories',
        title: 'Stories',
        imageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
        gradient: 'linear-gradient(to bottom right, #f97316, #c2410c)', // orange
    },
    {
        id: 'educational',
        title: 'Educational',
        imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
        gradient: 'linear-gradient(to bottom right, #14b8a6, #0f766e)', // teal
    },
];

export const podcastItems: PodcastItem[] = [
    {
        id: 'primocast-ep1',
        podcastCategoryId: 'business',
        category: 'podcast',
        title: 'PrimoCast',
        creator: 'Grupo Primo',
        duration: '58 min',
        description: 'Um bate-papo sobre finanças, investimentos e empreendedorismo com Thiago Nigro e convidados.',
        Icon: PlayIcon,
        imageUrl: 'https://images.unsplash.com/photo-1665686310934-865eb744314a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        content: `Episódio 1 do PrimoCast. Falamos sobre as principais estratégias de investimento para 2024.\n\nNeste episódio, exploramos:\n- A importância da diversificação de portfólio.\n- Análise de mercado para o próximo semestre.\n- Erros comuns de investidores iniciantes.`,
        views: 138000,
        publishedAt: "há 2 semanas",
        creatorAvatarUrl: "https://i.pravatar.cc/150?img=1"
    },
    {
        id: 'jota-jota-podcast-ep1',
        podcastCategoryId: 'business',
        category: 'podcast',
        title: 'Jota Jota Podcast',
        creator: 'Joel Jota',
        duration: '45 min',
        description: 'Conversas sobre alta performance, disciplina e desenvolvimento pessoal com atletas, empresários e especialistas.',
        Icon: PlayIcon,
        imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        content: `Neste episódio, Joel Jota discute a importância da disciplina para o sucesso nos negócios e na vida.`,
        views: 95000,
        publishedAt: "há 1 semana",
        creatorAvatarUrl: "https://i.pravatar.cc/150?img=12"
    },
    {
        id: 'os-socios-podcast-ep1',
        podcastCategoryId: 'business',
        category: 'podcast',
        title: 'Os Sócios Podcast',
        creator: 'Grupo Primo',
        duration: '72 min',
        description: 'Bruno Perini e Malu Perini recebem convidados para debater sobre liberdade financeira, negócios e filosofia.',
        Icon: PlayIcon,
        imageUrl: 'https://images.unsplash.com/photo-1560250056-07ba64664864?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
        content: `Bruno Perini e Malu Perini recebem um convidado especial para falar sobre empreendedorismo digital.`,
        views: 215000,
        publishedAt: "há 3 semanas",
        creatorAvatarUrl: "https://i.pravatar.cc/150?img=15"
    },
    {
        id: 'como-voce-fez-isso-ep1',
        podcastCategoryId: 'business',
        category: 'podcast',
        title: 'Como Você Fez Isso?',
        creator: 'Caio Carneiro',
        duration: '38 min',
        description: 'Caio Carneiro entrevista empreendedores de sucesso para descobrir os segredos por trás de suas jornadas.',
        Icon: PlayIcon,
        imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
        content: `Caio Carneiro entrevista um empreendedor de sucesso para descobrir os segredos por trás de sua jornada.`,
        views: 42000,
        publishedAt: "há 5 dias",
        creatorAvatarUrl: "https://i.pravatar.cc/150?img=33"
    },
    {
        id: 'psicologia-na-pratica-ep1',
        podcastCategoryId: 'self-care',
        category: 'podcast',
        title: 'Psicologia na Prática',
        creator: 'Alana Anijar',
        duration: '25 min',
        description: 'Um guia prático para entender e lidar com a ansiedade no dia a dia. Dicas e técnicas de uma psicóloga.',
        Icon: PlayIcon,
        imageUrl: 'https://images.unsplash.com/photo-1594122230689-45899d9e6f69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
        content: `Um guia prático para entender e lidar com a ansiedade no dia a dia. Dicas e técnicas de uma psicóloga.`,
        views: 78000,
        publishedAt: "há 1 mês",
        creatorAvatarUrl: "https://i.pravatar.cc/150?img=25"
    },
    {
        id: 'meditacao-guiada-ep1',
        podcastCategoryId: 'self-care',
        category: 'podcast',
        title: 'Meditação Guiada',
        creator: 'Mente em Paz',
        duration: '15 min',
        description: 'Uma meditação para relaxamento profundo e alívio do estresse. Encontre seu centro em 15 minutos.',
        Icon: PlayIcon,
        imageUrl: 'https://images.unsplash.com/photo-1506126613408-4e63a5f4bd40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
        content: `Uma meditação para relaxamento profundo e alívio do estresse. Encontre seu centro em 15 minutos.`,
        views: 112000,
        publishedAt: "há 2 meses",
        creatorAvatarUrl: "https://i.pravatar.cc/150?img=26"
    },
    {
        id: 'era-uma-vez-ep1',
        podcastCategoryId: 'stories',
        category: 'podcast',
        title: 'Era uma vez...',
        creator: 'Contadores de Histórias',
        duration: '18 min',
        description: 'Uma coleção de contos clássicos e modernos para encantar ouvintes de todas as idades.',
        Icon: PlayIcon,
        imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3ac4abd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
        content: `Uma coleção de contos clássicos e modernos para encantar ouvintes de todas as idades.`,
        views: 34000,
        publishedAt: "há 1 semana",
        creatorAvatarUrl: "https://i.pravatar.cc/150?img=40"
    },
    {
        id: 'nerdcast-ep1',
        podcastCategoryId: 'educational',
        category: 'podcast',
        title: 'Nerdcast',
        creator: 'Jovem Nerd',
        duration: '95 min',
        description: 'Um bate-papo descontraído sobre os mistérios do universo e as últimas descobertas da ciência.',
        Icon: PlayIcon,
        imageUrl: 'https://images.unsplash.com/photo-1589254065909-b7086229d08c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
        content: `Um bate-papo descontraído sobre os mistérios do universo e as últimas descobertas da ciência.`,
        views: 540000,
        publishedAt: "há 3 dias",
        creatorAvatarUrl: "https://i.pravatar.cc/150?img=60"
    }
];

export const podcastComments: Comment[] = [
    {
        id: 'c1',
        user: { name: 'João Silva', avatarUrl: 'https://i.pravatar.cc/150?img=3' },
        text: 'Episódio incrível! Aprendi muito sobre investimentos, obrigado!',
        timestamp: 'há 1 semana'
    },
    {
        id: 'c2',
        user: { name: 'Maria Oliveira', avatarUrl: 'https://i.pravatar.cc/150?img=5' },
        text: 'Achei a parte sobre diversificação muito clara. Parabéns pelo conteúdo.',
        timestamp: 'há 5 dias'
    },
    {
        id: 'c3',
        user: { name: 'Carlos Pereira', avatarUrl: 'https://i.pravatar.cc/150?img=7' },
        text: 'Qual livro vocês recomendam para quem está começando?',
        timestamp: 'há 3 dias'
    },
    {
        id: 'c4',
        user: { name: 'Ana Costa', avatarUrl: 'https://i.pravatar.cc/150?img=8' },
        text: 'Ótimas dicas! Já estou aplicando no meu portfólio.',
        timestamp: 'há 2 dias'
    }
];

export const resourceItems: ResourceItem[] = [
    {
        id: 'guia-burnout',
        type: 'guide',
        title: 'Guia para Lidar com Burnout',
        description: 'Um guia prático com passos para identificar e combater o burnout.',
        Icon: BookOpenIcon,
        imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3ac4abd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOTAwNXwwfDF8c2VhcmNofDV8fGJvb2slMjBndWlkZXxlbnwwfHx8fDE3MTk5Mzk4OTN8MA&ixlib=rb-4.0.3&q=80&w=400',
        content: `Guia Prático: Identificando e Combatendo o Burnout\nO burnout é um estado de exaustão emocional, física e mental causado por estresse excessivo e prolongado. Ele pode fazer você se sentir sobrecarregado, emocionalmente esgotado e incapaz de atender às demandas constantes.\n\nEtapa 1: Reconheça os Sinais\n- Exaustão crônica\n- Sentimentos de cinismo e distanciamento do trabalho\n- Sensação de ineficácia e falta de realização\n\nEtapa 2: Busque Apoio\n- Converse com seu supervisor, amigos ou familiares.\n- Procure um profissional de saúde mental.\n\nEtapa 3: Reavalie suas Prioridades\n- Defina limites claros entre trabalho e vida pessoal.\n- Aprenda a dizer "não".\n- Reserve tempo para relaxamento e hobbies.`
    },
    {
        id: 'ebook-mindfulness',
        type: 'ebook',
        title: 'E-book: A Arte do Mindfulness',
        description: 'Um e-book completo sobre como integrar o mindfulness no seu dia a dia.',
        Icon: BookOpenIcon,
        imageUrl: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOTAwNXwwfDF8c2VhcmNofDR8fGVib29rfGVufDB8fHx8fDE3MTk5Mzk5NDR8MA&ixlib=rb-4.0.3&q=80&w=400',
        content: `Introdução à Arte do Mindfulness\nEste e-book é seu companheiro para iniciar uma jornada transformadora de mindfulness. Mindfulness, ou atenção plena, é a prática de intencionalmente focar sua atenção no momento presente, sem julgamento. É uma habilidade que pode ser cultivada através da meditação e de outras práticas.\n\nCapítulo 1: O Que é Mindfulness?\nExploramos as origens e os benefícios cientificamente comprovados da atenção plena, incluindo a redução do estresse, a melhoria do foco e o aumento da inteligência emocional.\n\nCapítulo 2: Primeiros Passos\nUm guia prático com exercícios simples para iniciantes, como a meditação da respiração e a varredura corporal.`
    },
];

export const professionalsByCategory: Record<string, Professional[]> = {
    psychologists: [
        {
            id: 'psy1',
            name: 'Dra. Evelyn Reed',
            specialty: 'Psicóloga, TCC',
            bio: 'Especializada em ajudar jovens adultos a navegar pela ansiedade, estresse e transições de vida com uma abordagem compassiva e baseada em evidências.',
            avatarUrl: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
            rating: 4.9,
            availability: '08:00 - 17:00',
            status: 'Online',
            fee: 150
        },
        {
            id: 'psy2',
            name: 'Dr. Marcus Thorne',
            specialty: 'Psicólogo, Mindfulness',
            bio: 'Especialista em técnicas de mindfulness para gerenciar o burnout e a fadiga digital. Ajuda os clientes a construir resiliência e encontrar equilíbrio.',
            avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
            rating: 4.7,
            availability: '09:00 - 18:00',
            status: 'Offline',
            fee: 140
        },
        {
            id: 'psy3',
            name: 'Dra. Chloe Davis',
            specialty: 'Psicóloga, Relacionamentos',
            bio: 'Focada em ajudar indivíduos a entenderem seus estilos de apego para construir relacionamentos mais saudáveis e seguros.',
            avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
            rating: 4.8,
            availability: '10:00 - 19:00',
            status: 'Online',
            fee: 160
        },
        {
            id: 'psy4',
            name: 'Dr. Leonardo Farias',
            specialty: 'Psicólogo, Terapia de Aceitação',
            bio: 'Ajudo a desenvolver flexibilidade psicológica para lidar com pensamentos e sentimentos difíceis, focando no que realmente importa.',
            avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
            rating: 4.9,
            availability: '08:00 - 15:00',
            status: 'Online',
            fee: 135
        },
        {
            id: 'psy5',
            name: 'Dra. Sofia Mendes',
            specialty: 'Psicóloga, Psicologia Positiva',
            bio: 'Foco em cultivar forças, bem-estar e uma vida mais significativa e feliz, utilizando intervenções baseadas na ciência da felicidade.',
            avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
            rating: 4.6,
            availability: '13:00 - 21:00',
            status: 'Offline',
            fee: 145
        },
    ],
    nutritionists: [
        {
            id: 'nut1',
            name: 'Dr. Ricardo Alves',
            specialty: 'Nutricionista Esportivo',
            bio: 'Otimize seu desempenho e recuperação com um plano alimentar personalizado para seus treinos e metas.',
            avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
            rating: 4.8,
            availability: '07:00 - 16:00',
            status: 'Online',
            fee: 110
        },
        {
            id: 'nut2',
            name: 'Dra. Beatriz Lima',
            specialty: 'Nutricionista Funcional',
            bio: 'Vamos investigar a causa raiz dos seus problemas de saúde e criar um plano alimentar que nutre seu corpo de dentro para fora.',
            avatarUrl: 'https://images.unsplash.com/photo-1594744800838-86313559a334?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
            rating: 4.9,
            availability: '09:00 - 18:00',
            status: 'Online',
            fee: 125
        },
        {
            id: 'nut3',
            name: 'Dra. Clara Ribeiro',
            specialty: 'Comportamento Alimentar',
            bio: 'Desenvolva uma relação mais saudável e intuitiva com a comida, sem dietas restritivas e com foco no bem-estar.',
            avatarUrl: 'https://images.unsplash.com/photo-1557053910-d9eadeed1c58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
            rating: 4.7,
            availability: '10:00 - 19:00',
            status: 'Offline',
            fee: 115
        },
    ],
    personalTrainers: [
        {
            id: 'pt1',
            name: 'Lucas Pereira',
            specialty: 'Treinamento de Força',
            bio: 'Vamos construir o físico dos seus sonhos com treinos intensos, seguros e eficientes, focados em ganho de massa muscular.',
            avatarUrl: 'https://images.unsplash.com/photo-1567468218465-c4a4b4963e6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
            rating: 4.9,
            availability: '06:00 - 20:00',
            status: 'Online',
            fee: 90
        },
        {
            id: 'pt2',
            name: 'Ana Clara Santos',
            specialty: 'HIIT e Condicionamento',
            bio: 'Aulas de alta intensidade para queimar calorias, aumentar a resistência e definir o corpo de forma dinâmica e divertida.',
            avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
            rating: 4.8,
            availability: '07:00 - 18:00',
            status: 'Online',
            fee: 85
        },
    ],
    lifeCoaches: [
        {
            id: 'lc1',
            name: 'Renata Andrade',
            specialty: 'Coach de Carreira',
            bio: 'Alcance seus objetivos profissionais com clareza, foco e um plano de ação estratégico. Vamos destravar seu potencial.',
            avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
            rating: 4.9,
            availability: '09:00 - 19:00',
            status: 'Offline',
            fee: 180
        },
    ],
    meditationInstructors: [
        {
            id: 'mi1',
            name: 'Mestre Ananda',
            specialty: 'Meditação Vipassana',
            bio: 'Cultive a atenção plena e a equanimidade através da observação silenciosa da sua própria experiência.',
            avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
            rating: 5.0,
            availability: '08:00 - 12:00',
            status: 'Online',
            fee: 70
        },
        {
            id: 'mi2',
            name: 'Lila Devi',
            specialty: 'Meditação Guiada',
            bio: 'Encontre paz interior e alivie o estresse com meditações guiadas suaves e acolhedoras para todos os níveis.',
            avatarUrl: 'https://images.unsplash.com/photo-1610276198568-eb6d0ff53e48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
            rating: 4.8,
            availability: '14:00 - 20:00',
            status: 'Online',
            fee: 65
        },
    ]
};

export const initialUser: User = {
    name: 'Alex Rivera',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOTAwNXwwfDF8c2VhcmNofDd8fHdvbWFuJTIwcG9ydHJhaXR8ZW58MHx8fHwxNzIwNDE4MDIzfDA&ixlib=rb-4.0.3&q=80&w=200',
    handle: '@alex_rivera',
    bio: 'Explorando o equilíbrio entre mente e corpo. ✨\nAmante de ioga, natureza e boa comida.',
    followers: 1450,
    following: 320,
    email: 'alex.rivera@email.com',
    dob: '15/05/1998',
};

const userAuthor = { 
    name: initialUser.name, 
    handle: initialUser.handle, 
    avatar: initialUser.avatarUrl 
};

export let feedPosts: FeedPost[] = [];


export const chatConversations: ChatConversation[] = [
    {
        id: 'chat1',
        user: { name: 'Luis Gustavo', avatar: 'https://i.pravatar.cc/150?img=11' },
        lastMessage: 'E aí, tudo certo pra amanhã?',
        timestamp: '5m',
        isRead: false,
    },
    {
        id: 'chat2',
        user: { name: 'Dra. Evelyn Reed', avatar: 'https://i.pravatar.cc/150?img=25' },
        lastMessage: 'Sua sessão está confirmada para amanhã às 14h.',
        timestamp: '1h',
        isRead: true,
    },
    {
        id: 'chat3',
        user: { name: 'Fabio Luciano', avatar: 'https://i.pravatar.cc/150?img=12' },
        lastMessage: 'Adorei a foto que você postou!',
        timestamp: '3h',
        isRead: false,
    },
    {
        id: 'chat4',
        user: { name: 'Juliana Costa', avatar: 'https://i.pravatar.cc/150?img=26' },
        lastMessage: 'Você: Valeu pela dica da trilha!',
        timestamp: '1d',
        isRead: true,
    },
    {
        id: 'chat5',
        user: { name: 'Beatriz Lima', avatar: 'https://i.pravatar.cc/150?img=40' },
        lastMessage: 'Vamos marcar nossa leitura conjunta.',
        timestamp: '2d',
        isRead: true,
    },
    {
        id: 'chat6',
        user: { name: 'Dr. Marcus Thorne', avatar: 'https://i.pravatar.cc/150?img=60' },
        lastMessage: 'Lembre-se das técnicas de mindfulness que praticamos.',
        timestamp: '2d',
        isRead: true,
    },
    {
        id: 'chat7',
        user: { name: 'Guilherme', avatar: 'https://i.pravatar.cc/150?img=50' },
        lastMessage: 'Vamos marcar aquele café?',
        timestamp: '3d',
        isRead: false,
    }
];


// Nutrition Data
export const dailyNutrition: DailyNutrition = {
    consumed: 1291,
    goal: 2117, // 1291 consumed + 826 remaining
    burned: 244,
};

export const macros: Macro[] = [
    { name: 'Carboidratos', consumed: 206, goal: 258, color: 'bg-blue-400' },
    { name: 'Proteína', consumed: 35, goal: 103, color: 'bg-pink-400' },
    { name: 'Gordura', consumed: 32, goal: 68, color: 'bg-yellow-400' },
];

export const meals: Meal[] = [
    { id: '1', name: 'Café da manhã', calories: 56, goal: 635, icon: '☕️' },
    { id: '2', name: 'Almoço', calories: 856, goal: 847, icon: '🥪' },
    { id: '3', name: 'Jantar', calories: 379, goal: 529, icon: '🥗' },
    { id: '4', name: 'Lanches', calories: 0, goal: 106, icon: '🍎' },
];

export const dailyWater: DailyWater = { consumed: 1.8, goal: 2.5 };

export const weeklyWaterData: WaterDataPoint[] = [
    { day: 'S-4', liters: 1.5 },
    { day: 'S-3', liters: 2.0 },
    { day: 'S-2', liters: 1.8 },
    { day: 'S-1', liters: 2.2 },
    { day: 'Atual', liters: 1.8 },
];

export const weeklyCaloriesBurnedData: CalorieDataPoint[] = [
    { day: 'S-4', calories: 320 },
    { day: 'S-3', calories: 450 },
    { day: 'S-2', calories: 210 },
    { day: 'S-1', calories: 500 },
    { day: 'Atual', calories: 244 },
];


export const notifications: Notification[] = [];

export const workoutFrequencyData: ProgressChartData[] = [
  { week: 'S-4', workouts: 3 },
  { week: 'S-3', workouts: 4 },
  { week: 'S-2', workouts: 2 },
  { week: 'S-1', workouts: 5 },
  { week: 'Atual', workouts: 4 },
];

export const goals: Goal[] = [
  { 
    id: 'g1', 
    title: 'Meditação Consistente', 
    description: 'Meditar por 10 minutos todos os dias.', 
    currentProgress: 4, 
    target: 7, 
    unit: 'dias' 
  },
  { 
    id: 'g2', 
    title: 'Meta de Passos', 
    description: 'Atingir 10.000 passos diários.', 
    currentProgress: 8500, 
    target: 10000, 
    unit: 'passos' 
  },
  { 
    id: 'g3', 
    title: 'Hidratação', 
    description: 'Beber 2 litros de água por dia.', 
    currentProgress: 1.5, 
    target: 2, 
    unit: 'litros' 
  },
];

export const achievementCategoryStyles: { [key in AchievementCategory]: { label: string, color: string, bgColor: string, borderColor: string } } = {
    'Engajamento': { label: 'Engajamento', color: 'text-blue-600', bgColor: 'bg-blue-100', borderColor: 'border-blue-500' },
    'Saúde Física': { label: 'Saúde Física', color: 'text-orange-600', bgColor: 'bg-orange-100', borderColor: 'border-orange-500' },
    'Saúde Mental': { label: 'Saúde Mental', color: 'text-purple-600', bgColor: 'bg-purple-100', borderColor: 'border-purple-500' },
    'Exploração': { label: 'Exploração', color: 'text-emerald-600', bgColor: 'bg-emerald-100', borderColor: 'border-emerald-500' },
};


export const achievements: Achievement[] = [
    { id: 'a1', title: 'Primeiro Login', description: 'Faça login no aplicativo pela primeira vez.', unlocked: true, Icon: TrophyIcon, category: 'Engajamento' },
    { id: 'a2', title: 'Check-in de 7 Dias', description: 'Faça o check-in de humor por 7 dias seguidos.', unlocked: true, Icon: TrophyIcon, category: 'Engajamento' },
    { id: 'a3', title: 'Primeiro Treino', description: 'Complete seu primeiro vídeo de treino.', unlocked: true, Icon: TrophyIcon, category: 'Saúde Física' },
    { id: 'a4', title: 'Mente Zen', description: 'Complete sua primeira meditação guiada.', unlocked: true, Icon: TrophyIcon, category: 'Saúde Mental' },
    { id: 'a5', title: 'Leitor Voraz', description: 'Leia 3 artigos ou guias completos.', unlocked: false, Icon: TrophyIcon, category: 'Exploração' },
    { id: 'a6', title: 'Chef Saudável', description: 'Explore 3 receitas de nutrição diferentes.', unlocked: false, Icon: TrophyIcon, category: 'Exploração' },
    { id: 'a7', title: 'Guru da Academia', description: 'Complete 10 treinos no total.', unlocked: false, Icon: TrophyIcon, category: 'Saúde Física' },
    { id: 'a8', title: 'Explorador Mestre', description: 'Explore todos os tipos de conteúdo (treino, meditação, nutrição, podcast, guia).', unlocked: false, Icon: TrophyIcon, category: 'Exploração' },
];

// --- Story Data ---
const storyUser = { name: initialUser.name, avatarUrl: initialUser.avatarUrl };

export let userStories: Story[] = [];

export let storyHighlights: StoryHighlight[] = [];


// --- Followers/Following Data ---

export const followersList: RelatedUser[] = [
  { id: 'f1', name: 'Lucas Pereira', handle: '@lucasp', avatarUrl: 'https://i.pravatar.cc/150?img=14', followingStatus: 'not_following' },
  { id: 'f2', name: 'Ana Clara Santos', handle: '@anacsantos', avatarUrl: 'https://i.pravatar.cc/150?img=20', followingStatus: 'following' },
  { id: 'f3', name: 'Carlos Andrade', handle: '@carlos_andrade', avatarUrl: 'https://i.pravatar.cc/150?img=12', followingStatus: 'not_following' },
  { id: 'f4', name: 'Dra. Evelyn Reed', handle: '@draevelyn', avatarUrl: 'https://i.pravatar.cc/150?img=25', followingStatus: 'following' },
  { id: 'f5', name: 'Rafael Souza', handle: '@rafasouza', avatarUrl: 'https://i.pravatar.cc/150?img=15', followingStatus: 'not_following' },
  { id: 'f6', name: 'Pedro Oliveira', handle: '@pedro_oliveira', avatarUrl: 'https://i.pravatar.cc/150?img=11', followingStatus: 'not_following' },
  { id: 'f7', name: 'Juliana Martins', handle: '@jumartins', avatarUrl: 'https://i.pravatar.cc/150?img=26', followingStatus: 'following' },
  { id: 'f8', name: 'Gabriel Almeida', handle: '@galmeida', avatarUrl: 'https://i.pravatar.cc/150?img=33', followingStatus: 'not_following' },
  { id: 'f9', name: 'Beatriz Lima', handle: '@bialima', avatarUrl: 'https://i.pravatar.cc/150?img=40', followingStatus: 'following' },
  { id: 'f10', name: 'Laura Martins', handle: '@lauramartins', avatarUrl: 'https://i.pravatar.cc/150?img=49', followingStatus: 'not_following' },
  { id: 'f11', name: 'Renata Andrade', handle: '@renata.coach', avatarUrl: 'https://i.pravatar.cc/150?img=27', followingStatus: 'not_following' },
  { id: 'f12', name: 'Tiago Barros', handle: '@tiagobarros', avatarUrl: 'https://i.pravatar.cc/150?img=63', followingStatus: 'following' },
  { id: 'f13', name: 'Camila Rocha', handle: '@camilarocha', avatarUrl: 'https://i.pravatar.cc/150?img=48', followingStatus: 'not_following' },
  { id: 'f14', name: 'Dr. Ricardo Alves', handle: '@dr.ricardo', avatarUrl: 'https://i.pravatar.cc/150?img=68', followingStatus: 'following' },
  { id: 'f15', name: 'Dra. Beatriz Lima', handle: '@dra.bia', avatarUrl: 'https://i.pravatar.cc/150?img=40', followingStatus: 'not_following' },
  { id: 'f16', name: 'Mestre Ananda', handle: '@mestreananda', avatarUrl: 'https://i.pravatar.cc/150?img=62', followingStatus: 'not_following' },
  { id: 'f17', name: 'Kenji Tanaka', handle: '@kenji.zazen', avatarUrl: 'https://i.pravatar.cc/150?img=59', followingStatus: 'not_following' },
  { id: 'f18', name: 'Lucas Pereira', handle: '@lucasp', avatarUrl: 'https://i.pravatar.cc/150?img=14', followingStatus: 'following' },
  { id: 'f19', name: 'Sofia Mendes', handle: '@sofiamendes', avatarUrl: 'https://i.pravatar.cc/150?img=32', followingStatus: 'not_following' },
  { id: 'f20', name: 'Isabela Ferreira', handle: '@isa.ferreira', avatarUrl: 'https://i.pravatar.cc/150?img=45', followingStatus: 'following' }
];

export const followingList: RelatedUser[] = [
  { id: 'f2', name: 'Ana Clara Santos', handle: '@anacsantos', avatarUrl: 'https://i.pravatar.cc/150?img=20', followingStatus: 'following' },
  { id: 'f4', name: 'Dra. Evelyn Reed', handle: '@draevelyn', avatarUrl: 'https://i.pravatar.cc/150?img=25', followingStatus: 'following' },
  { id: 'f7', name: 'Juliana Martins', handle: '@jumartins', avatarUrl: 'https://i.pravatar.cc/150?img=26', followingStatus: 'following' },
  { id: 'f9', name: 'Beatriz Lima', handle: '@bialima', avatarUrl: 'https://i.pravatar.cc/150?img=40', followingStatus: 'following' },
  { id: 'f12', name: 'Tiago Barros', handle: '@tiagobarros', avatarUrl: 'https://i.pravatar.cc/150?img=63', followingStatus: 'following' },
  { id: 'f14', name: 'Dr. Ricardo Alves', handle: '@dr.ricardo', avatarUrl: 'https://i.pravatar.cc/150?img=68', followingStatus: 'following' },
  { id: 'f18', name: 'Lucas Pereira', handle: '@lucasp', avatarUrl: 'https://i.pravatar.cc/150?img=14', followingStatus: 'following' },
  { id: 'f20', name: 'Isabela Ferreira', handle: '@isa.ferreira', avatarUrl: 'https://i.pravatar.cc/150?img=45', followingStatus: 'following' },
  { id: 'f21', name: 'Dr. Marcus Thorne', handle: '@drmarcus', avatarUrl: 'https://i.pravatar.cc/150?img=60', followingStatus: 'following' },
  { id: 'f22', name: 'Juliana Costa', handle: '@jucosta', avatarUrl: 'https://i.pravatar.cc/150?img=26', followingStatus: 'following' },
];

export const brazilianStates = [
  { value: "AC", label: "Acre" },
  { value: "AL", label: "Alagoas" },
  { value: "AP", label: "Amapá" },
  { value: "AM", label: "Amazonas" },
  { value: "BA", label: "Bahia" },
  { value: "CE", label: "Ceará" },
  { value: "DF", label: "Distrito Federal" },
  { value: "ES", label: "Espírito Santo" },
  { value: "GO", label: "Goiás" },
  { value: "MA", label: "Maranhão" },
  { value: "MT", label: "Mato Grosso" },
  { value: "MS", label: "Mato Grosso do Sul" },
  { value: "MG", label: "Minas Gerais" },
  { value: "PA", label: "Pará" },
  { value: "PB", label: "Paraíba" },
  { value: "PR", label: "Paraná" },
  { value: "PE", label: "Pernambuco" },
  { value: "PI", label: "Piauí" },
  { value: "RJ", label: "Rio de Janeiro" },
  { value: "RN", label: "Rio Grande do Norte" },
  { value: "RS", label: "Rio Grande do Sul" },
  { value: "RO", label: "Rondônia" },
  { value: "RR", label: "Roraima" },
  { value: "SC", label: "Santa Catarina" },
  { value: "SP", label: "São Paulo" },
  { value: "SE", label: "Sergipe" },
  { value: "TO", label: "Tocantins" },
];

export const groupClasses: GroupClass[] = [
  { 
      id: 'zumba-paulista', 
      title: 'Zumba Party', 
      time: 'HOJE, 17H', 
      imageUrl: 'https://images.unsplash.com/photo-1549476464-373921717541?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      region: 'SP',
      period: 'Tarde',
      ageRange: '18-25',
      description: 'Uma aula de dança divertida e energética, combinando ritmos latinos e internacionais. Perfeita para queimar calorias e se divertir ao mesmo tempo. Não é necessário ter experiência com dança, apenas vontade de se mover!',
      duration: '50 min',
      videoUrl: 'https://www.youtube.com/embed/g_tea8ZN-ZE',
      location: {
        name: 'Synapse Unidade Paulista',
        address: 'Av. Paulista, 1234, São Paulo - SP',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.14589136281!2d-46.656539084475!3d-23.5630993846875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0x1c981938d9b1a5e!2sAvenida%20Paulista%2C%201234%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2001310-100!5e0!3m2!1spt-BR!2sbr!4v1678886543210!5m2!1spt-BR!2sbr'
      },
      participants: [
        { id: 'pt2', name: 'Ana Clara Santos', avatarUrl: 'https://i.pravatar.cc/150?img=20' },
        { id: 'f9', name: 'Beatriz Lima', avatarUrl: 'https://i.pravatar.cc/150?img=40' },
      ]
  },
  { 
      id: 'alongamento-ipanema', 
      title: 'Alongamento & Flex', 
      time: 'AMANHÃ, 08H', 
      imageUrl: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      region: 'RJ',
      period: 'Manhã',
      ageRange: 'Outros',
      description: 'Comece o dia com o corpo mais leve e a mente mais tranquila. Esta aula foca em melhorar a flexibilidade, aliviar tensões musculares e aumentar a consciência corporal através de exercícios suaves e controlados.',
      duration: '45 min',
      location: {
        name: 'Synapse Unidade Ipanema',
        address: 'R. Visconde de Pirajá, 540, Rio de Janeiro - RJ',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3673.578641325126!2d-43.20894508449646!3d-22.96577398499256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9bd55b0d6a2f9d%3A0x1b725b89a9f5b6e6!2sRua%20Visconde%20de%20Piraj%C3%A1%2C%20540%20-%20Ipanema%2C%20Rio%20de%20Janeiro%20-%20RJ%2C%2022410-002!5e0!3m2!1spt-BR!2sbr!4v1678886654321!5m2!1spt-BR!2sbr'
      },
      participants: [
        { id: 'pt3', name: 'Pedro Oliveira', avatarUrl: 'https://i.pravatar.cc/150?img=11' },
      ]
  },
  { 
      id: 'hiit-savassi', 
      title: 'Power HIIT', 
      time: 'AMANHÃ, 19H', 
      imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      region: 'MG',
      period: 'Noite',
      ageRange: '26-40',
      description: 'Treino intervalado de alta intensidade para máxima queima de calorias e melhora do condicionamento físico em tempo recorde. Prepare-se para suar e superar seus limites!',
      duration: '30 min',
      videoUrl: 'https://www.youtube.com/embed/g_tea8ZN-ZE',
      location: {
        name: 'Synapse Unidade Savassi',
        address: 'R. Tomé de Souza, 830, Belo Horizonte - MG',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3750.916962450893!2d-43.93144808455365!3d-19.92796198661643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa699de24e0b099%3A0x291d31038984dfb!2sRua%20Tom%C3%A9%20de%20Souza%2C%20830%20-%20Savassi%2C%20Belo%20Horizonte%20-%20MG%2C%2030140-130!5e0!3m2!1spt-BR!2sbr!4v1678886765432!5m2!1spt-BR!2sbr'
      },
      participants: [
        { id: 'pt2', name: 'Ana Clara Santos', avatarUrl: 'https://i.pravatar.cc/150?img=20' },
        { id: 'pt1', name: 'Lucas Pereira', avatarUrl: 'https://i.pravatar.cc/150?img=14' },
      ]
  },
  { 
      id: 'yoga-moinhos', 
      title: 'Yoga Flow', 
      time: 'SEX, 09H', 
      imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      region: 'RS',
      period: 'Manhã',
      ageRange: 'Outros',
      description: 'Uma prática de yoga dinâmica que sincroniza movimento e respiração. Ideal para construir força, aumentar a flexibilidade e acalmar a mente. Aberto para todos os níveis.',
      duration: '60 min',
      location: {
        name: 'Synapse Unidade Moinhos',
        address: 'R. Padre Chagas, 300, Porto Alegre - RS',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.457890123456!2d-51.2078901234567!3d-30.02456789012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x951979c8da0aa315%3A0x1c981938d9b1a5e!2sRua%20Padre%20Chagas%2C%20300%20-%20Moinhos%20de%20Vento%2C%20Porto%20Alegre%20-%20RS%2C%2090570-080!5e0!3m2!1spt-BR!2sbr!4v1678886876543!5m2!1spt-BR!2sbr'
      },
      participants: [
        { id: 'mi2', name: 'Lila Devi', avatarUrl: 'https://i.pravatar.cc/150?img=49' },
      ]
  },
  { 
      id: 'funcional-batel', 
      title: 'Funcional na Praça', 
      time: 'SAB, 10H', 
      imageUrl: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      region: 'PR',
      period: 'Manhã',
      ageRange: '26-40',
      description: 'Treino funcional ao ar livre para melhorar força, equilíbrio e condicionamento. Usamos o peso do corpo e acessórios para um treino completo e dinâmico.',
      duration: '50 min',
      location: {
        name: 'Praça da Espanha',
        address: 'Alameda Dr. Carlos de Carvalho, Curitiba - PR',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3603.111222333444!2d-49.290111188888!3d-25.434555577777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dce380d9ffffff%3A0x1f23a6b5d9b1c2d!2sPra%C3%A7a%20da%20Espanha!5e0!3m2!1spt-BR!2sbr!4v1689999999999!5m2!1spt-BR!2sbr'
      },
      participants: [
        { id: 'pt3', name: 'Pedro Oliveira', avatarUrl: 'https://i.pravatar.cc/150?img=11' },
      ]
  },
  { 
      id: 'boxe-liberdade', 
      title: 'Boxe para Todos', 
      time: 'QUA, 20H', 
      imageUrl: 'https://images.unsplash.com/photo-1593509939522-26a947146d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      region: 'SP',
      period: 'Noite',
      ageRange: '18-25',
      description: 'Aprenda os fundamentos do boxe em uma aula de alta energia que melhora o condicionamento cardiovascular, a força e a coordenação. Libere o estresse e ganhe confiança.',
      duration: '60 min',
      location: {
          name: 'Synapse Unidade Liberdade',
          address: 'R. Galvão Bueno, 500, São Paulo - SP',
          mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.44589136281!2d-46.636539084475!3d-23.5530993846875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59a9f7f7f7f7%3A0x3d3f2dfb1f7f7f7f!2sRua%20Galv%C3%A3o%20Bueno%2C%20500%20-%20Liberdade%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2001506-000!5e0!3m2!1spt-BR!2sbr!4v1678886987654!5m2!1spt-BR!2sbr'
      },
      participants: [
        { id: 'pt1', name: 'Lucas Pereira', avatarUrl: 'https://i.pravatar.cc/150?img=14' },
      ]
  }
];