
import React, { Component, Fragment } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QuizMarvel } from '../Quiz-Marvel';
import Levels from '../Levels';
import ProgressBar from '../ProgressBar/ProgressBar';
import QuizOver from '../QuizOver/QuizOver';
import { FaChevronRight } from 'react-icons/fa';

//toast.configure();

class Quiz extends Component {

    constructor(props) {
        super(props)

        this.initialState = {         
            LevelNames: ['debutant', 'confirme', 'expert', 'ultime'],
            quizLevel: 0, //state pour incrementer levelNames
            maxQuestions: 10,
            storedQuestions: [],
            question: null,
            options: [],
            idQuestion: 0,
            btnDisabled: true,
            userAnswer: null,
            score: 0,
            showWelcomeMsg: false,
            quizEnd: false,
            //percent: null,
        }

        this.state = this.initialState
        // creation de ref pour stocker de la data
        this.storedDataRef = React.createRef()
    }

    loadQuestions = (level) => { // function pour charger les quiz

        // acceder au premier niveau de question debutant
        const fetchedArrayQuiz = QuizMarvel[0].quizz[level];
        //console.log(fetchedArrayQuiz);

        if (fetchedArrayQuiz.length >= this.state.maxQuestions) {

            this.storedDataRef.current = fetchedArrayQuiz;
            //console.log(this.storedDataRef.current);

            //enlever la clé answers
            const newArray = fetchedArrayQuiz.map(({ answer, ...keepRest }) => keepRest);
            this.setState({
                storedQuestions: newArray
            })
        }
        else {
            console.log('Pas assez de questions');
        }
    }


    //declaration de la function de bienvenue
    showToastMsg = pseudo => {

        if (!this.state.showWelcomeMsg) {
             
            this.setState({
                showWelcomeMsg: true 
            })
            
            toast.info(`Bienvenue sur Ultimate Marvel Quiz ${pseudo}`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
        
    }
    


    //methode de cycle de vie pour fetch data 
    componentDidMount() {
        //invoquations de loadQuestions
        this.loadQuestions(this.state.LevelNames[this.state.quizLevel])
    }

    nextQuestion = () => {
        /*en invoquant la methode nextQuestion nous allons verifier si nous venons 
        pas de validé la dernier question si cest le cas gameOver si na ont peut toujour
        incrementer pour passer la question suivant */
        if (this.state.idQuestion === this.state.maxQuestions - 1) {
            //this.gameOver()
            this.setState({
                quizEnd: true
            })

        } else {
            this.setState((prevState) => ({
                idQuestion: prevState.idQuestion + 1
            }))
        }

        //cibler le answer de la premiere question dans le tableau "this.storedDataRef.current"
        // si la reponse fourni est correcte on increment le score
        const goodAnswer = this.storedDataRef.current[this.state.idQuestion].answer;
        if (this.state.userAnswer === goodAnswer) {
            this.setState((prevState) => ({
                score: prevState.score + 1   
            }))

            toast.success("Bravoo + 1 !", {
                position: "top-right",
                autoclose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                bodyClassName: 'toastify-color'
            });
        } else {

            toast.error("Faux 0", {
                position: "top-right",
                autoclose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }


    //methode de cycle de vie pour mettre a jours le state
    componentDidUpdate(prevProps, prevState) {

        // .... et this.state.storedQuestions est different d'un tableau vide
        if ((this.state.storedQuestions !== prevState.storedQuestions) && this.state.storedQuestions.length) {

            //console.log(this.state.storedQuestions[this.state.idQuestion]);

            //mise a jours des etats 'question et option'
            this.setState({
                question: this.state.storedQuestions[this.state.idQuestion].question, //obtenir les questions dans storeQuestion[]
                options: this.state.storedQuestions[this.state.idQuestion].options //obtenir les options dans storeQuestion[]
            })
        }
        //reactivation de le methode componentDidUpdate pour afficher la question suivantes
        /* idQuestion different du idQuestion precedent et storedQuestions.length n'est pas*/
        if ((this.state.idQuestion !== prevState.idQuestion) && this.state.storedQuestions.length) {
            this.setState({
                question: this.state.storedQuestions[this.state.idQuestion].question,
                options: this.state.storedQuestions[this.state.idQuestion].options,
                btnDisabled: true, // cacher le button
                userAnswer: null, // remettre la reponse du user a null
            })
        }

  
        if (this.state.quizEnd !== prevState.quizEnd) {
            const gradePercent = this.getPercentage(this.state.maxQuestions, this.state.score);
            this.gameOver(gradePercent)
        }

        if (this.props.userData.pseudo !==prevProps.userData.pseudo)  {
            this.showToastMsg(this.props.userData.pseudo)
        }

    }

    submitAnswer = (selectedAnswer) => {
        this.setState({
            userAnswer: selectedAnswer,
            btnDisabled: false
        })
    }
    //pourcentage de reussite
    getPercentage = (maxQuest, ourScore) => (ourScore / maxQuest) * 100;

    gameOver = (percentage) => {
        //console.log(percentage, '1111');

        //const gradePercent = this.getPercentage(this.state.maxQuestions, this.state.score);
        if (percentage >= 60) {
            //console.log(percentage, '222');

            this.setState({
                quizLevel: this.state.quizLevel + 1,
                percent: percentage,
                
            })
        } else {
            this.setState({
                percent: percentage,
                 })
        }
    }

    loadLevelQuestion = (param) => {
        this.setState({ ...this.initialState, quizLevel: param })

        this.loadQuestions(this.state.LevelNames[param]);
    }
    
    
    render() {
        //console.log("Quiz....", this.props.userData); 

        if(this.props.userData === undefined || this.props.userData === null) {
            return (
                <div>User data not fetched</div>
                );
            }
            
            // si this.state.idQuestion < this.state.maxQuestions - 1 on afficher suivant sinon terminer
        const nextLevel = this.state.idQuestion < this.state.maxQuestions - 1 ? 'Suivant' : 'Terminer'
        

          const { pseudo } = this.props.userData;
        //console.log(this.props.userData);

        const displayOptions = this.state.options.map((option, index) => {
            return (
                <p key={index}

                    //si la reponse du user est identique(userAnswer) = a celle obtenue dans le map "option" dans ce cas tu applik la class "selected" si na ne fais rien
                    className={`answerOptions ${this.state.userAnswer === option ? "selected" : null}`}
                    onClick={() => this.submitAnswer(option)}
                >
                    <FaChevronRight/>
                     {option} 
                </p>
            )
        })

        //si this.state.quizEnd return true si non on affiche le bloc avec fragment
        return this.state.quizEnd ? (
            <QuizOver
                ref={this.storedDataRef}
                LevelNames={this.state.LevelNames}
                score={this.state.score}
                maxQuestions={this.state.maxQuestions}
                quizLevel={this.state.quizLevel}
                percent={this.state.percent}
                loadLevelQuestion={this.loadLevelQuestion}

            />

        ) : (
            <Fragment>

                {/*<h2>pseudo: {this.props.userData.pseudo}</h2>*/}

                <Levels 
                LevelNames={this.state.LevelNames}
                quizLevel={this.state.quizLevel}
                />
                <ProgressBar
                    idQuestion={this.state.idQuestion}
                    maxQuestions={this.state.maxQuestions}
                />
                <h2>{this.state.question}</h2>

                {displayOptions} {/* affiche des differents options*/}

                <button
                    disabled={this.state.btnDisabled}
                    className='btnSubmit'
                    onClick={this.nextQuestion}
                >   {nextLevel}
                </button>
                < ToastContainer />
            </Fragment>
        )
    }
}


export default React.memo(Quiz);