/* @flow */
/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

import type { ValidationContext } from '../index';
import { GraphQLError } from '../../error';


export function unknownTypeMessage(type: any): string {
  return `Unknown type "${type}".`;
}

/**
 * Known type names
 *
 * A GraphQL document is only valid if referenced types (specifically
 * variable definitions and fragment conditions) are defined by the type schema.
 */
export function KnownTypeNames(context: ValidationContext): any {
  return {
    NamedType(node) {
      var typeName = node.name.value;
      var type = context.getSchema().getType(typeName);
      if (!type) {
        return new GraphQLError(unknownTypeMessage(typeName), [ node ]);
      }
    }
  };
}
