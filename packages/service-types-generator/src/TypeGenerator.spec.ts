import {model} from "./shapes.fixture";
import {TypeGenerator} from "./TypeGenerator";

describe('TypeGenerator', () => {
    it('should iterate over all complex shapes in a model', () => {
        const shapes = {...model.shapes};
        expect(
            Object.keys(shapes)
                .filter(shape => shapes[shape].type === 'structure')
                .length
        ).toBeGreaterThan(0);

        for (let [shapeName, _] of new TypeGenerator(model)) {
            delete shapes[shapeName];
        }

        expect(
            Object.keys(shapes)
                .filter(shape => shapes[shape].type === 'structure')
                .length
        ).toBe(0);
    });

    it('should yield a union of the input types defined in the model', () => {
        let found = false;
        for (const [fileName, content] of new TypeGenerator(model)) {
            if (fileName === 'InputTypesUnion') {
                found = true;
                expect(content).toMatch('export type InputTypesUnion = ');
            }
        }

        expect(found).toBe(true);
    });

    it('should yield a union of the output types defined in the model', () => {
        let found = false;
        for (const [fileName, content] of new TypeGenerator(model)) {
            if (fileName === 'OutputTypesUnion') {
                found = true;
                expect(content).toMatch('export type OutputTypesUnion = ');
            }
        }

        expect(found).toBe(true);
    });
});
