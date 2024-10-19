import { pipeline, env} from '@xenova/transformers';
// Okay so It took a whole week to solve this issue, its a technical fault by the xenova library. 
//  this happens when you create your project using frameworks like vite
// the only fix available yet is to never allow the user to use local models. so he has to download them everytime from remote servers which is extremely time consuming. Until a xenova fixes this, we cant do anything
env.useBrowserCache = false;
env.allowLocalModels = false;

class MyTranslationPipeline {
    static task = 'translation';
    static model = 'Xenova/nllb-200-distilled-600M';
    static instance = null;

    static async getInstance(progress_callback = null) {
        if (this.instance === null) {
            try {
                this.instance = pipeline(this.task, this.model, { progress_callback });
                console.log("Translation Pipeline: ", pipeline);
            } catch (error) {
                console.log("Error creating pipeline instance: ", error);
            }
        }

        return this.instance;
    }
}

self.addEventListener('message', async (event) => {
    let translator = await MyTranslationPipeline.getInstance(x => {
        self.postMessage(x)
    })
    console.log(event.data)
    let output = await translator(event.data.text, {
        tgt_lang: event.data.tgt_lang,
        src_lang: event.data.src_lang,

        callback_function: x => {
            self.postMessage({
                status: 'update',
                output: translator.tokenizer.decode(x[0].output_token_ids, { skip_special_tokens: true })
            })
        }
    })

    console.log('Translated Output: ', output)

    self.postMessage({
        status: 'complete',
        output
    })
})