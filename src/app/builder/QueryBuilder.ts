import { FilterQuery, Query } from 'mongoose';
import { excludesFields } from '../modules/student/constant.student';

class QueryBuilder<T> {
  //   public queryModel: Query<T[], T>;
  //   public query: Record<string, unknown>;
  constructor(
    public queryModel: Query<T[], T>,
    public query: Record<string, unknown>,
  ) {
    this.queryModel = queryModel;
    this.query = query;
  }
  // method search
  search(searchableFields: string[]) {
    const searchTerm = this.query.searchTerm || '';
    if (searchTerm) {
      this.queryModel = this.queryModel.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }
  // method filter
  filter() {
    const queryObj = { ...this.query };
    excludesFields.forEach((el) => delete queryObj[el]);
    this.queryModel = this.queryModel.find(queryObj as FilterQuery<T>);
    return this;
  }
  //method sort
  sort() {
    const sort = (this.query.sort as string) || '-createdAt';
    this.queryModel = this.queryModel.sort(sort);
    return this;
  }
  //method skip
  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;
    this.queryModel = this.queryModel.skip(skip).limit(limit);
    return this;
  }

  // method field
  fields() {
    const fields =
      (this?.query?.fields as string).split(',').join(' ') || '-__V';
    this.queryModel = this.queryModel.select(fields);
    return this;
  }
}
export default QueryBuilder;
