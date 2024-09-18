<template>
    <div class="main">
        <div class="mainHeader">
            <div class="title">
                <h1 @click="clearFilters">Provy</h1>
            </div>
            <div class="search">
                <input class="Pesquisar" type="text" v-model="searchQuery" placeholder="Buscar prestador...">
                <button class="search-button" @click="searchPrestadores">Pesquisar</button>
            </div>
        </div>
        <div class="mainBody">
            <h2 class="title-centralizada">Encontre o prestador(a) ideal</h2>
            <div class="filter-buttons">
                <div class="profissoes-container">
                    <button :class="{'active': activeFilter.profissao}" @click="toggleProfissoes">{{ activeFilter.profissao || 'Profissões' }}</button>
                    <div v-if="showProfissoes" class="profissoes-dropdown">
                        <button @click="selectProfissao('')">Todos</button>
                        <button @click="selectProfissao('Eletricista')">Eletricista</button>
                        <button @click="selectProfissao('Faxineira')">Faxineira</button>
                        <button @click="selectProfissao('Encanador')">Encanador</button>
                    </div>
                </div>
                <div class="sexo-container">
                    <button :class="{'active': activeFilter.sexo}" @click="toggleSexo">{{ activeFilter.sexo === 'F' ? 'Feminino' : activeFilter.sexo === 'M' ? 'Masculino' : 'Sexo' }}</button>
                    <div v-if="showSexo" class="sexo-dropdown">
                        <button @click="selectSexo('')">Todos</button>
                        <button @click="selectSexo('F')">Feminino</button>
                        <button @click="selectSexo('M')">Masculino</button>
                    </div>
                </div>
                <div class="ordenar-container">
                    <button :class="{'active': activeSort}" @click="toggleOrdenar">{{ activeSort === 'avaliacao' ? 'Avaliação' : activeSort === 'preco' ? 'Preço' : 'Ordenar' }}</button>
                    <div v-if="showOrdenar" class="ordenar-dropdown">
                        <button @click="selectOrdenar('avaliacao')">Avaliação</button>
                        <button @click="selectOrdenar('preco')">Preço</button>
                    </div>
                </div>
            </div>
            <div class="Prestadores">
                <div v-for="prestador in filteredPrestadores" :key="prestador.nome" class="card">
                    <h3>{{ prestador.nome }}</h3>
                    <p><strong>Idade:</strong> {{ prestador.idade }} anos</p>
                    <p><strong>Profissão:</strong> {{ prestador.profissao }}</p>
                    <p><strong>Sexo:</strong> {{ prestador.sexo }}</p>
                    <p><strong>Experiência:</strong> {{ prestador.experiencia }} anos</p>
                    <p><strong>Avaliação:</strong> ★{{ prestador.avaliacao }} ({{ prestador.avaliacao }}/5)</p>
                    <p><strong>Preço:</strong> {{ prestador.preco }}</p>
                    <p><strong>Serviços:</strong> {{ prestador.servicos.join(', ') }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchQuery: '',
            showProfissoes: false,
            showSexo: false,
            showOrdenar: false,
            activeFilter: {
                profissao: '',
                sexo: ''
            },
            activeSort: '',
            prestadores: [
                { nome: 'João Silva', idade: 35, profissao: 'Encanador', sexo: 'M', experiencia: 10, avaliacao: 4, preco: '$$', servicos: ['Conserto de vazamentos', 'Instalação de torneiras'] },
                { nome: 'Maria Oliveira', idade: 28, profissao: 'Encanadora', sexo: 'F', experiencia: 5, avaliacao: 5, preco: '$$', servicos: ['Desentupimento', 'Instalação de sistemas de água'] },
                { nome: 'Carlos Pereira', idade: 40, profissao: 'Eletricista', sexo: 'M', experiencia: 15, avaliacao: 3, preco: '$$$', servicos: ['Instalação elétrica', 'Reparos em fiação'] },
                { nome: 'Ana Costa', idade: 32, profissao: 'Faxineira', sexo: 'F', experiencia: 8, avaliacao: 4, preco: '$', servicos: ['Limpeza geral', 'Organização de ambientes'] },
                { nome: 'Pedro Souza', idade: 30, profissao: 'Jardineiro', sexo: 'M', experiencia: 7, avaliacao: 5, preco: '$$', servicos: ['Corte de grama', 'Poda de árvores'] },
                { nome: 'Luciana Almeida', idade: 45, profissao: 'Pintora', sexo: 'F', experiencia: 12, avaliacao: 4, preco: '$$$', servicos: ['Pintura de paredes', 'Acabamentos'] }
            ],
            filteredPrestadores: []
        };
    },
    methods: {
        searchPrestadores() {
            this.filteredPrestadores = this.prestadores.filter(prestador =>
                prestador.profissao.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        },
        toggleProfissoes() {
            this.showProfissoes = !this.showProfissoes;
            this.showSexo = false;
            this.showOrdenar = false;
        },
        toggleSexo() {
            this.showSexo = !this.showSexo;
            this.showProfissoes = false;
            this.showOrdenar = false;
        },
        toggleOrdenar() {
            this.showOrdenar = !this.showOrdenar;
            this.showProfissoes = false;
            this.showSexo = false;
        },
        selectProfissao(profissao) {
            this.activeFilter.profissao = profissao;
            this.filteredPrestadores = this.prestadores.filter(prestador =>
                !profissao || 
                prestador.profissao.toLowerCase() === profissao.toLowerCase() || 
                (profissao === '' && prestador.profissao)
            );
            this.showProfissoes = false;
        },
        selectSexo(sexo) {
            this.activeFilter.sexo = sexo;
            this.filteredPrestadores = this.prestadores.filter(prestador =>
                !sexo || prestador.sexo === sexo
            );
            this.showSexo = false;
        },
        selectOrdenar(criteria) {
            this.activeSort = criteria;
            if (criteria === 'avaliacao') {
                this.filteredPrestadores.sort((a, b) => b.avaliacao - a.avaliacao);
            } else if (criteria === 'preco') {
                const priceOrder = { '$': 1, '$$': 2, '$$$': 3, '$$$$': 4 };
                this.filteredPrestadores.sort((a, b) => priceOrder[a.preco] - priceOrder[b.preco]);
            }
            this.showOrdenar = false;
        },
        clearFilters() {
            this.searchQuery = '';
            this.filteredPrestadores = this.prestadores;
            this.activeFilter = { profissao: '', sexo: '' };
            this.activeSort = '';
            this.showProfissoes = false;
            this.showSexo = false;
            this.showOrdenar = false;
        }
    },
    created() {
        this.filteredPrestadores = this.prestadores;
    }
};
</script>

<style scoped>
.mainHeader {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background-color: #ececec;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.title {
    display: flex;
    align-items: center;
}

.title h1 {
    color: #3498db;
    margin: 0;
    cursor: pointer;
    text-transform: capitalize; 
}

.search {
    display: flex;
}

.search .Pesquisar {
    padding: 8px;
    border: 2px solid #3498db;
    border-radius: 20px 0 0 20px; 
}

.search button {
    padding: 8px;
    border: 2px solid #3498db; 
    border-left: none;
    border-radius: 0 20px 20px 0;
    background-color: #3498db;
    color: white;
    cursor: pointer;
}

.search button:hover {
    background-color: #2980b9;
}

.mainBody {
    display: block;
    align-items: center;
    padding: 20px;
}

.title-centralizada {
    text-align: center;
    color: #3498db;
    margin: 20px 0;
}

.filter-buttons {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
}

.profissoes-container,
.sexo-container,
.ordenar-container {
    position: relative;
    margin-left: 10px;
}

.profissoes-container button,
.sexo-container button,
.ordenar-container button {
    padding: 10px;
    border: 2px solid lightgray; 
    border-radius: 20px; 
    background-color: transparent;
    color: lightgray; 
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
}

.profissoes-container button.active,
.sexo-container button.active,
.ordenar-container button.active {
    background-color: #3498db;
    color: white; 
}

.profissoes-dropdown,
.sexo-dropdown,
.ordenar-dropdown {
    position: absolute;
    top: 40px;
    left: 0;
    background: white;
    border: 2px solid #3498db; 
    border-radius: 8px; 
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    z-index: 10;
}

.profissoes-dropdown button,
.sexo-dropdown button,
.ordenar-dropdown button {
    display: block;
    padding: 8px;
    width: 100%;
    text-align: left;
    border: none;
    background: none;
    border-radius: 20px; 
    color: #3498db;
    cursor: pointer;
}

.profissoes-dropdown button:hover,
.sexo-dropdown button:hover,
.ordenar-dropdown button:hover {
    background-color: #f1f1f1;
}

.Prestadores {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.card {
    background: #fff;
    border: 2px solid #3498db;
    border-radius: 12px;
    padding: 15px;
    margin: 10px;
    width: 200px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.card h3 {
    color: #2c3e50;
}

.card p {
    margin: 5px 0;
    color: #555;
}
</style>
