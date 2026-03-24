import React from 'react';

type PromptProps = {
  promptText: string;
};

const Prompt = ({ promptText }: PromptProps) => {
  const safePromptText =
    typeof promptText === 'string' ? promptText : JSON.stringify(promptText ?? '');

  return (
    <div className="card pb-2.5">
      <div className="card-header p-2" id="prompts">
        <h3 className="card-title text-md md:text-lg">Prompts</h3>
      </div>

      <div className="md:card-body p-2 grid gap-5">
        <div className="w-full">
          <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
            <label className="form-label flex items-center gap-1 max-w-40 text-sm md:text-md">
              Prompts:<span className="text-danger text-xl">*</span>
            </label>

            <textarea
              className="textarea"
              placeholder="prompt"
              value={safePromptText}
              rows={22}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prompt;
