'use_strict'

export class Renderer
{
    static #canvas;
    static #context;

    static init(canvas, graphics_context)
    {
        Renderer.#canvas = canvas;
        Renderer.#context = canvas.getContext(graphics_context);
    }

    static get_width()
    {
        return Renderer.#canvas.width;
    }

    static get_height()
    {
        return Renderer.#canvas.height;
    }
    
    static clear_canvas(x,y,width,height)
    {
        Renderer.#context.clearRect(x,y,width,height);
    }

    static render(x, y, width, height)
    {
        Renderer.#context.fillRect(x, y, width, height);
    }
    
    static render_text(text,text_x,text_y,context_font)
    {
        Renderer.#context.font = context_font;
        Renderer.#context.fillText(text, text_x,text_y);
    }
}